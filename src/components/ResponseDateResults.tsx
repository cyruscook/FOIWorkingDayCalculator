import React, { use, useMemo } from "react";
import { addWorkingDays } from "../lib/wdcalc";
import { DateTime } from "luxon";
import { getProclamations, type Proclamations } from "../lib/proclamations";

import classes from "./ResponseDateResults.module.css";

type LoadedResponseDateResults = {
  proclamationsPromise: Promise<Proclamations>;
  receivedDate: Date;
  workingDays: number;
};
const LoadedResponseDateResults: React.FC<LoadedResponseDateResults> = ({
  proclamationsPromise,
  receivedDate,
  workingDays,
}) => {
  const proclamations = use(proclamationsPromise);

  const res = useMemo(
    () =>
      addWorkingDays(
        DateTime.fromJSDate(receivedDate),
        workingDays,
        proclamations,
      ),
    [receivedDate, workingDays, proclamations],
  );

  return (
    <>
      <p className={classes.result}>
        A response is due by midnight on{" "}
        {res.toLocaleString(DateTime.DATE_FULL)}
      </p>
    </>
  );
};

type ResponseDateResultsProps = {
  receivedDate: Date | null;
  workingDays: number;
};
const ResponseDateResults: React.FC<ResponseDateResultsProps> = ({
  receivedDate,
  workingDays,
}) => {
  const proclamationsPromise = useMemo(() => getProclamations(), []);

  return (
    <>
      {receivedDate !== null ? (
        //<Suspense fallback={<span>Loading...</span>}>
        <LoadedResponseDateResults
          proclamationsPromise={proclamationsPromise}
          receivedDate={receivedDate}
          workingDays={workingDays}
        />
      ) : (
        //</Suspense>
        <></>
      )}
    </>
  );
};

export default ResponseDateResults;
