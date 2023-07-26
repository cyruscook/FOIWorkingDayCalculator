(function () {
	var DateTime = luxon.DateTime;

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

	function showCalendarForYear(startYear) {


		var currentYearTxt = document.querySelector("#calendar-current-year");
		var table = document.querySelector("#calendar-table");
		var tbody = document.querySelector("#calendar-table > tbody");
		var row = undefined;
		
		tbody.replaceChildren([]);
		currentYearTxt.innerText = startYear;
		var date = DateTime.utc(startYear, 1, 1);
		var easter = window.eastercalc(startYear);
	
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
			if (window.wdcalc.isNonWorkingDay(date, easter)) {
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

	var prevYearBtn = document.querySelector("#calendar-prev-year");
	var nextYearBtn = document.querySelector("#calendar-next-year");
	
	var currentYear = DateTime.utc().year;

	function saveInAddress(year) {
		var params = new URLSearchParams(document.location.search);
		params.set("year", year);
		window.history.replaceState(window.history.state, "", "?" + params.toString());
	}

	prevYearBtn.addEventListener("click", function (event) {
		event.preventDefault();
		currentYear -= 1;
		showCalendarForYear(currentYear);
		saveInAddress(currentYear);
	});

	nextYearBtn.addEventListener("click", function (event) {
		event.preventDefault();
		currentYear += 1;
		showCalendarForYear(currentYear);
		saveInAddress(currentYear);
	});

	(function () {
		var params = new URLSearchParams(document.location.search);
		currentYear = Number(params.get("year")) || currentYear;
	})();

	showCalendarForYear(currentYear);
}());