import { DateTime } from "luxon";
import { isNonWorkingDay } from "./wdcalc";
import { type Proclamations } from "./proclamations";

type CalendarDay = [DateTime, boolean] | null;
type CalendarWeek = Array<CalendarDay>;
type CalendarMonth = Array<CalendarWeek>;
type CalendarYear = Array<CalendarMonth>;

export function getCalendarDataForYear(
  year: number,
  proclamations: Proclamations,
): CalendarYear {
  const out: CalendarYear = [];
  let date = DateTime.utc(year, 1, 1);
  while (date.year === year) {
    const month = out[date.month - 1] || [];
    out[date.month - 1] = month;

    if (date.day === 1 || date.weekday === 1) {
      // New month/week
      const week: CalendarWeek = [];
      month.push(week);

      if (date.weekday !== 1) {
        // Add empty spaces for beginning of week until month begins
        for (let i = 1; i < date.weekday; i++) {
          week.push(null);
        }
      }
    }
    const week = month[month.length - 1];
    if (
      (date.year > 1971 || (date.month >= 12 && date.day >= 16)) &&
      isNonWorkingDay(date, proclamations)
    ) {
      week.push([date, false]);
    } else {
      week.push([date, true]);
    }

    if (date.day === date.daysInMonth && date.weekday < 7) {
      // Add empty spaces for rest of week
      for (let i = date.weekday; i < 7; i++) {
        week.push(null);
      }
    }

    date = date.plus({ days: 1 });
  }
  return out;
}
