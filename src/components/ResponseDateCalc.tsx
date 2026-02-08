import React, { useState } from "react";
import ResponseDateInput from "./ResponseDateInput";
import ResponseDateResults from "./ResponseDateResults";

import classes from "./ResponseDateCalc.module.css";

const ResponseDateCalc: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [workingDays, setWorkingDays] = useState<number>(20);
  const [error] = useState<string | null>(null);

  return (
    <section className={classes.responseCalc}>
      <div className={classes.responseCalcReceivedDate}>
        <ResponseDateInput
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          workingDays={workingDays}
          setWorkingDays={setWorkingDays}
        />
      </div>

      {error && (
        <div id="response-calc-error" role="alert">
          <span>Error:</span> {error}
        </div>
      )}

      <div className="response-calc-result">
        <ResponseDateResults
          receivedDate={selectedDate}
          workingDays={workingDays}
        />
      </div>
    </section>
  );
};

export default ResponseDateCalc;
