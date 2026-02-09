import React, { Suspense, use, useMemo } from "react";

import { getProclamations, type Proclamations } from "../lib/proclamations";
import WorkingDayCalendar from "../components/WorkingDayCalendar";
import { ErrorBoundary } from "react-error-boundary";

type LoadedCalendarProps = {
  proclamationsPromise: Promise<Proclamations>;
};
const LoadedCalendar: React.FC<LoadedCalendarProps> = ({
  proclamationsPromise,
}) => {
  const proclamations = use(proclamationsPromise);

  return <WorkingDayCalendar proclamations={proclamations} />;
};

const Calendar: React.FC = () => {
  const proclamationsPromise = useMemo(() => getProclamations(), []);

  return (
    <>
      <h1>
        Calendar indicating which days are working days under the Freedom of
        Information Act
      </h1>

      <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <LoadedCalendar proclamationsPromise={proclamationsPromise} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Calendar;
