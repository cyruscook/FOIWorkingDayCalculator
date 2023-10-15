import { DateTime } from "luxon";
import { easterCalc } from './eastercalc.js';

function dateTimesEqual(d1, d2) {
	return d1.hasSame(d2, "year") && d1.hasSame(d2, "month") && d1.hasSame(d2, "day");
}

function createDateTime(year, month, day) {
	return DateTime.fromObject({ year: year, month: month, day: day }, { zone: 'Europe/London' })
}

const bhCache = {};
const easterCache = {};

export const bankHolidaysForYear = function(year, proclamations) {
	let bhs = [];

	for (const notice of Object.keys(proclamations["bhs"])) {
		for (const date of proclamations["bhs"][notice]) {
			if (date.year === year) {
				bhs.push(date);
			}
		}
	}
	
	let easter = easterCache[year];
	if (!easter) {
		easterCache[year] = createDateTime(...easterCalc(year))
		easter = easterCache[year];
	}
	
	// New Year’s Day, if it be not a Sunday or, if it be a Sunday, 3rd January
	let ny = createDateTime(year, 1, 1);
	if (ny.weekday !== 7) {
		bhs.push(ny);
	} else {
		bhs.push(createDateTime(year, 1, 3));
	}
	// 2nd January, if it be not a Sunday or, if it be a Sunday, 3rd January
	let ny2 = createDateTime(year, 1, 2);
	if (ny2.weekday !== 7) {
		bhs.push(ny2);
	} else {
		bhs.push(createDateTime(year, 1, 3));
	}
	// 17th March, if it be not a Sunday or, if it be a Sunday, 18th March - Saint Patricks
	let gf = createDateTime(year, 3, 17);
	if (gf.weekday !== 7) {
		bhs.push(gf);
	} else {
		bhs.push(createDateTime(year, 3, 18));
	}
	// Good Friday (two days before easter)
	bhs.push(easter.plus({ days: -2 }));
	// Easter Monday (day after easter)
	bhs.push(easter.plus({ days: 1 }));
	// First Monday of May
	for (let i = 1; i < 8; i++) {
		let date = createDateTime(year, 5, i);
		if (date.weekday === 1) {
			bhs.push(date);
			break;
		}
	}
	// The last Monday in May
	for (let i = 0; i < 7; i++) {
		let daysInMonth = 31;
		let date = createDateTime(year, 5, daysInMonth - i);
		if (date.weekday === 1) {
			bhs.push(date);
			break;
		}
	}
	// First Monday of August
	for (let i = 1; i < 8; i++) {
		let date = createDateTime(year, 8, i);
		if (date.weekday === 1) {
			bhs.push(date);
			break;
		}
	}
	// The last Monday in August
	for (let i = 0; i < 7; i++) {
		let daysInMonth = 31;
		let date = createDateTime(year, 8, daysInMonth - i);
		if (date.weekday === 1) {
			bhs.push(date);
			break;
		}
	}
	// 30th November, if it is not a Saturday or Sunday or, if it is a Saturday or Sunday, the first Monday following that day - Saint Andrews Day
	let sa = createDateTime(year, 11, 30);
	if (sa.weekday !== 6 && sa.weekday !== 7) {
		bhs.push(sa);
	} else {
		var sar = sa;
		do {
			sar = sar.plus({ days: 1});
		} while (sar.weekday !== 1);
		bhs.push(sa);
	}
	// Christmas Day, if it be not a Sunday or, if it be a Sunday, 26th December
	let cd = createDateTime(year, 12, 25);
	if (cd.weekday !== 7) {
		bhs.push(cd);
	} else {
		bhs.push(createDateTime(year, 12, 26));
	}
	// 26th December, if it be not a Sunday
	let d26 = createDateTime(year, 12, 26);
	if (d26.weekday !== 7) {
		bhs.push(d26);
	}
	// 27th December in a year in which 25th or 26th December is a Sunday
	if (cd.weekday === 7 || d26.weekday === 7) {
		bhs.push(createDateTime(year, 12, 27));
	}

	let bhArray = new Array(12);
	for (let month = 1; month < 13; month++) {
		let date = createDateTime(year, month, 1);
		bhArray[month-1] = new Array(date.daysInMonth).fill(false);
	}

	for (const date of bhs) {
		bhArray[date.month-1][date.day-1] = true;
	}
	
	for (const notice of Object.keys(proclamations["nbhs"])) {
		for (const date of proclamations["nbhs"][notice]) {
			if (date.year === year) {
				bhArray[date.month-1][date.day-1] = false;
			}
		}
	}

	// Common Law holidays
	// Christmas Day
	bhArray[12-1][25-1] = true;
	// Good Friday
	let gfcl = easter.plus({ days: -2 });
	bhArray[gfcl.month-1][gfcl.day-1] = true;

	return bhArray;
}

export const isNonWorkingDay = function(date, proclamations) {
	if (date.year <= 1971 && date.month <= 12 && date.day < 16) {
		throw new Error("Dates before 16 December 1971 are not supported as the Banking and Financial Dealings Act 1971 had not received Royal Assent");
	}

	if (date.weekday === 6 || date.weekday === 7) {
		return true;
	}

	let bankholidays = bhCache[date.year];
	if (!bankholidays) {
		bhCache[date.year] = bankHolidaysForYear(date.year, proclamations);
		bankholidays = bhCache[date.year];
	}

	return bankholidays[date.month-1][date.day-1];
}

export const addWorkingDays = function(date, days, proclamations) {
	var easterYear = NaN;
	var easter = undefined;

	for (var i = 0; i < days;) {
		// Add a day
		date = date.plus({ days: 1 });

		// If it was a working day, increase the counter
		if (!isNonWorkingDay(date, proclamations)) {
			i++;
		}
	}

	return date;
}

