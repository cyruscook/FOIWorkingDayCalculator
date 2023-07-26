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

	var responsePanel = document.querySelector("#results-response-panel");
	var responseDate = document.querySelector("#results-response-date");
	
	var params = new URLSearchParams(document.location.search);
	var day = Number(params.get("20day"));
	var month = Number(params.get("20month"));
	var year = Number(params.get("20year"));

	if (day !== NaN && month !== NaN && year !== NaN) {
		var datetime = DateTime.utc(year, month, day);
		responseDate.innerText = datetime.day + " " + monthStrings[datetime.month - 1] + " " + datetime.year;
	
		responsePanel.removeAttribute("hidden");
		responsePanel.removeAttribute("aria-hidden");
	}

	var backBtn = document.querySelector("#results-back-btn");
	backBtn.addEventListener("click", function(event) {
		event.preventDefault();
		window.history.back();
	});
}());