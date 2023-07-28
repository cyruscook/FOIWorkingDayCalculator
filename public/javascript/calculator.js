(function () {
	window.wdcalc = {};

	function isSaturday(date) {
		return date.weekday === 6
	}

	function isSunday(date) {
		return date.weekday === 7
	}

	var nonworkingdays = [
		// Saturdays
		isSaturday,
		// Sundays
		isSunday,
		// New Year's Day
		function (date) {
			return date.day === 1 && date.month === 1;
		},
		// 2 January
		function (date) {
			return date.year >= 1973 && date.day === 2 && date.month === 1;
		},
		// 3 January
		function (date) {
			return date.year >= 1973 && date.day === 3 && date.month === 1 && (date.weekday === 1 || date.weekday === 2);
		},
		// Saint Patricks
		function (date) {
			return date.day === 17 && date.month === 3;
		},
		// Saint Patricks substitute
		function (date) {
			return date.day === 18 && date.month === 3 && date.weekday === 1;
		},
		// Good Friday (two days before easter)
		function (date, easter) {
			var twoPlus = date.plus({ days: 2 });
			return twoPlus.hasSame(easter, "day") && twoPlus.hasSame(easter, "month");
		},
		// Easter Monday (day after easter)
		function (date, easter) {
			var oneMinus = date.minus({ days: 1 });
			return oneMinus.hasSame(easter, "day") && oneMinus.hasSame(easter, "month");
		},
		// First Monday of May
		function (date) {
			return date.weekday === 1 && date.month === 5 && date.day <= 7;
		},
		// Last Monday of May
		function (date) {
			return date.weekday === 1 && date.month === 5 && date.daysInMonth - date.day <= 7;
		},
		// First Monday of August
		function (date) {
			return date.weekday === 1 && date.month === 8 && date.daysInMonth - date.day <= 7;
		},
		// Last Monday of August
		function (date) {
			return date.weekday === 1 && date.month === 8 && date.daysInMonth - date.day <= 7;
		},
		// Saint Andrews Day
		function (date) {
			return date.day === 30 && date.month === 11;
		},
		// Saint Andrews Day substitute
		function (date) {
			return date.month === 12 && (date.day === 1 || date.day === 2) && date.weekday === 1;
		},
		// Christmas Day
		function (date) {
			return date.month === 12 && date.day === 25;
		},
		// Boxing Day
		function (date) {
			return date.month === 12 && date.day === 26;
		},
		// Christmas Day substitute
		function (date) {
			return date.month === 12 && date.day === 27 && (date.weekday === 1 || date.weekday === 2);
		}
	];

	function isNonWorkingDay(date, easter) {
		if (date.year <= 1971 && date.month <= 12 && date.day < 16) {
			throw new Error("Dates before 16 December 1971 are not supported as the Banking and Financial Dealings Act 1971 had not received Royal Assent");
		}
		for (var i = 0; i < nonworkingdays.length; i++) {
			if (nonworkingdays[i](date, easter)) {
				return true;
			}
		}
		return false;
	}

	function addWorkingDays(date, days) {
		var easterYear = NaN;
		var easter = undefined;

		for (var i = 0; i < days;) {
			// Add a day
			date = date.plus({ days: 1 });

			// Update easter if necessary
			if (date.year !== easterYear) {
				easterYear = date.year;
				easter = window.eastercalc(easterYear);
			}

			// If it was a working day, increase the counter
			if (!isNonWorkingDay(date, easter)) {
				i++;
			}
		}

		return date;
	}

	window.wdcalc.isNonWorkingDay = isNonWorkingDay;
	window.wdcalc.addWorkingDays = addWorkingDays;
}());