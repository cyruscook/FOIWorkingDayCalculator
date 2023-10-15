import { DateTime } from "luxon";
import { isNonWorkingDay } from './wdcalc.js';
import { getProclamations } from './proclamations.js';

var monthStrings = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

async function showCalendarForYear(startYear) {
	console.log("Showing year", startYear);

	var currentYearTxt = document.querySelector(".govuk-pagination__item--current > a");
	var table = document.querySelector("#calendar-table");
	var tbody = document.querySelector("#calendar-table > tbody");
	var row = undefined;
	
	tbody.replaceChildren([]);
	currentYearTxt.innerText = startYear;
	var date = DateTime.utc(startYear, 1, 1);
    let proclamations = await getProclamations(`https://d7rpp5pzwp0ap.cloudfront.net/bh_api`);

	while (date.year === startYear) {
		if (date.day === 1) {
			// New month, create title row
			row = document.createElement("tr");
			tbody.appendChild(row);
			var title = document.createElement("th");
			title.innerText = monthStrings[date.month - 1];
			title.setAttribute("colspan", "7")
			row.appendChild(title);
		}
		if (date.day === 1 || date.weekday === 1) {
			// New month/week, new row
			row = document.createElement("tr");
			tbody.appendChild(row);

			if (date.weekday !== 1) {
				// Add empty spaces for beginning of week
				for (var i = 1; i < date.weekday; i++) {
					var item = document.createElement("td");
					item.classList.add("calendar-none");
					row.appendChild(item);
				}
			}
		}

		var item = document.createElement("td");
		item.innerText = date.day;
		row.appendChild(item);
		if ((date.year > 1971 || (date.month >= 12 && date.day >= 16)) && isNonWorkingDay(date, proclamations)) {
			item.classList.add("calendar-nwd");
		} else {
			item.classList.add("calendar-wd");
		}

		if (date.day === date.daysInMonth && date.weekday < 7) {
			// Add empty spaces for rest of week
			for (var i = date.weekday; i < 7; i++) {
				var item = document.createElement("td");
				item.classList.add("calendar-none");
				row.appendChild(item);
			}
		}

		date = date.plus({ days: 1 });
	}

}

var prevYearBtn = document.querySelector(".govuk-pagination__prev > a.govuk-pagination__link");
var nextYearBtn = document.querySelector(".govuk-pagination__next > a.govuk-pagination__link");

var currentYear = DateTime.utc().year;

function saveInAddress(year) {
	var params = new URLSearchParams(document.location.search);
	params.set("year", year);
	window.history.replaceState(window.history.state, "", window.location.pathname + "?" + params.toString() + window.location.hash);
}

prevYearBtn.addEventListener("click", function (event) {
	event.preventDefault();
	if (prevYearBtn.hasAttribute("disabled")) {
		return;
	}
	currentYear -= 1;
	if (currentYear <= 1971) {
		prevYearBtn.setAttribute("disabled", "true");
		prevYearBtn.setAttribute("aria-disabled", "true");
	}
	showCalendarForYear(currentYear);
	saveInAddress(currentYear);
});

nextYearBtn.addEventListener("click", function (event) {
	event.preventDefault();
	currentYear += 1;
	showCalendarForYear(currentYear);
	saveInAddress(currentYear);
	if (currentYear > 1971) {
		prevYearBtn.removeAttribute("disabled");
		prevYearBtn.removeAttribute("aria-disabled");
	}
});

(function () {
	var params = new URLSearchParams(document.location.search);
	currentYear = Number(params.get("year")) || currentYear;
	saveInAddress(currentYear);
})();

showCalendarForYear(currentYear);