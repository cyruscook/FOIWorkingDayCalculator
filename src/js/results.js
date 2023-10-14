import { DateTime } from "luxon";
import { addWorkingDays } from './wdcalc.js';
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

var responsePanel = document.querySelector("#results-response-panel");
var responseDate = document.querySelector("#results-response-date");
var responseTable = document.querySelector("#results-response-table");
var responseTableBody = document.querySelector("#results-response-table > tbody");

var params = new URLSearchParams(document.location.search);
var day = Number(params.get("day"));
var month = Number(params.get("month"));
var year = Number(params.get("year"));

if (day !== NaN && month !== NaN && year !== NaN) {
    let proclamations = await getProclamations(window.location.origin);

    var date = DateTime.utc(year, month, day);
    var after20 = addWorkingDays(date, 20, proclamations);

    responseDate.innerText = after20.day + " " + monthStrings[after20.month - 1] + " " + after20.year;

    for (var extension = 21; extension < 61; extension++) {
        var extensionDate = addWorkingDays(date, extension);
        
        var row = document.createElement("tr");
        var head = document.createElement("th");
        var item = document.createElement("td");
        row.classList.add("govuk-table__row");
        head.classList.add("govuk-table__header");
        head.setAttribute("scope", "row");
        item.classList.add("govuk-table__cell");

        head.innerText = extension + " working days";
        item.innerText = extensionDate.day + " " + monthStrings[extensionDate.month - 1] + " " + extensionDate.year;

        row.appendChild(head);
        row.appendChild(item);
        responseTableBody.appendChild(row);
    }

    responsePanel.removeAttribute("hidden");
    responsePanel.removeAttribute("aria-hidden");
    responseTable.removeAttribute("hidden");
    responseTable.removeAttribute("aria-hidden");
}
