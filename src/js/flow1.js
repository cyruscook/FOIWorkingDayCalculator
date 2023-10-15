import { DateTime } from "luxon";

var contBtn = document.querySelector("a.govuk-button");
var form = document.querySelector("form#flow1-form");
var dayInput = document.querySelector("#request-received-day");
var monthInput = document.querySelector("#request-received-month");
var yearInput = document.querySelector("#request-received-year");

// Check if state is saved in the address bar
(function () {
    var params = new URLSearchParams(document.location.search);
    dayInput.value = params.get("day") || dayInput.value;
    monthInput.value = params.get("month") || monthInput.value;
    yearInput.value = params.get("year") || yearInput.value;
})();

function saveInAddress(day, month, year) {
    var params = new URLSearchParams(document.location.search);
    params.set("day", day);
    params.set("month", month);
    params.set("year", year);
    window.history.replaceState(window.history.state, "", "?" + params.toString());
}

function invalidDate(message) {
    var formGroup = document.querySelector("#flow1-form > .govuk-form-group");
    var fieldset = document.querySelector("#flow1-form > .govuk-form-group > .govuk-fieldset");
    var errorElem = document.querySelector("#request-received-error");

    errorElem.classList.add("govuk-error-message");
    errorElem.innerText = " " + message;

    var hiddenElem = document.createElement("span");
    hiddenElem.classList.add("govuk-visually-hidden");
    hiddenElem.innerText = "Error:";

    errorElem.appendChild(hiddenElem);

    errorElem.removeAttribute("hidden");
    errorElem.removeAttribute("aria-hidden");

    formGroup.classList.add("govuk-form-group--error");
    fieldset.setAttribute("aria-describedby", fieldset.getAttribute("aria-describedby") + " request-received-error");
}

function submitForm() {
    var day = Number(dayInput.value);
    var month = Number(monthInput.value);
    var year = Number(yearInput.value);

    saveInAddress(day, month, year);

    if (day === NaN || month === NaN || year === NaN) {
        // One of the inputs wasn't a number
        invalidDate("You must input a number into each field");
    } else if (day < 1 || month < 1 || day > 31 || month > 12) {
        // The day and month aren't valid
        invalidDate("The day and month are not valid");
    } else {

        var date = DateTime.utc(year, month, day);

        if (year !== date.year || month !== date.month || day !== date.day) {
            // The date wasn't valid - probably one of the units were too high
            invalidDate("The given date is not a valid date");
        } else if (date.year <= 1971 && date.month <= 12 && date.day < 16) {
            invalidDate("Dates before 16 December 1971 are not supported");
        } else {
            var params = new URLSearchParams();
            params.set("day", date.day);
            params.set("month", date.month);
            params.set("year", date.year);
            document.location.assign("results.html?" + params.toString());
        }
    }
};

contBtn.addEventListener("click", (e) => {
    e.preventDefault();
    submitForm();
});

contBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    submitForm();
});
