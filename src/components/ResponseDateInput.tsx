import React, { useEffect } from "react";
import { DatePicker, registerLocale, setDefaultLocale } from "react-datepicker";
import { enGB } from "date-fns/locale/en-GB";

import "react-datepicker/dist/react-datepicker.css";
import classes from "./ResponseDateInput.module.css";

type ResponseDateInputProps = {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  workingDays: number;
  setWorkingDays: (days: number) => void;
};

const ResponseDateInput: React.FC<ResponseDateInputProps> = ({
  selectedDate,
  setSelectedDate,
  workingDays,
  setWorkingDays,
}) => {
  useEffect(() => {
    registerLocale("en-GB", enGB);
    setDefaultLocale("en-GB");
  }, []);

  return (
    <div className={classes.inputContainer}>
      <div className={classes.inputGroup}>
        <h3>When was the request received?</h3>
        <small>
          This is not the date the request was confirmed, but the date it was
          successfully delivered.
        </small>
        <DatePicker
          wrapperClassName="datePicker"
          selected={selectedDate}
          onChange={(date: Date | null) => {
            setSelectedDate(date);
          }}
          className={classes.datePicker}
          locale="en-GB"
          dateFormat="P"
          todayButton="Today"
          minDate={new Date(1971, 12, 16)}
          placeholderText="Select a date"
        />
      </div>
      <div className={classes.inputGroup}>
        <h3>How many working days should be added?</h3>
        <small>
          Requests should usually be responded to in 20 working days.
        </small>
        <input
          type="text"
          pattern="(?:0|[1-9]\d*)"
          inputMode="decimal"
          autoComplete="off"
          value={workingDays}
          onChange={(e) => {
            const value = (e.target as HTMLInputElement).value;
            setWorkingDays(parseInt(value, 10));
          }}
        />
      </div>
    </div>
  );
};

export default ResponseDateInput;
