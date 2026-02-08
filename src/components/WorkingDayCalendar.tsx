import { useMemo, useState } from "react";
import { getCalendarDataForYear } from "../lib/calendar";
import { type Proclamations } from "../lib/proclamations";

import classes from "./WorkingDayCalendar.module.css";
import DatePicker from "react-datepicker";
import { DateTime } from "luxon";

type LoadedCalendarYearProps = {
  proclamations: Proclamations;
  year: number;
};
const LoadedCalendarYear: React.FC<LoadedCalendarYearProps> = ({
  proclamations,
  year,
}) => {
  const calendarData = useMemo(() => {
    return getCalendarDataForYear(year, proclamations);
  }, [year, proclamations]);
  return (
    <div className={classes.year}>
      {calendarData.map((month, i) => (
        <table className={classes.monthTable} key={i}>
          <caption>{DateTime.utc(year, i + 1, 1).toFormat("LLLL")}</caption>
          <thead>
            <tr>
              <th scope="col">Mon</th>
              <th scope="col">Tue</th>
              <th scope="col">Wed</th>
              <th scope="col">Thu</th>
              <th scope="col">Fri</th>
              <th scope="col">Sat</th>
              <th scope="col">Sun</th>
            </tr>
          </thead>
          <tbody>
            {month.map((week, j) => (
              <tr key={j}>
                {week.map((day, k) => {
                  if (day === null) {
                    return <td key={k}></td>;
                  }
                  const [date, isWorkingDay] = day;
                  return (
                    <td
                      key={k}
                      className={
                        isWorkingDay
                          ? classes.workingDay
                          : classes.nonWorkingDay
                      }
                    >
                      {date.day}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
};

type WorkingDayCalendarProps = {
  proclamations: Proclamations;
};
const WorkingDayCalendar: React.FC<WorkingDayCalendarProps> = ({
  proclamations,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={setSelectedDate}
        minDate={new Date(1971, 12, 16)}
        showYearPicker
        dateFormat="yyyy"
      />
      {selectedDate !== null ? (
        <LoadedCalendarYear
          proclamations={proclamations}
          year={selectedDate.getFullYear()}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default WorkingDayCalendar;
