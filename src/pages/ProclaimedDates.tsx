import React, { Suspense, use, useMemo } from "react";
import { DateTime } from "luxon";
import {
  getProclamations,
  type DateToNotices,
  type Proclamations,
} from "../lib/proclamations";

type LoadedProclaimedDatesListProps = {
  datesToNotices: DateToNotices;
};
const LoadedProclaimedDatesList: React.FC<LoadedProclaimedDatesListProps> = ({
  datesToNotices,
}) => {
  return (
    <ul>
      {datesToNotices
        .keys()
        .sort()
        .map((iso) => {
          const notices = datesToNotices.getValue(iso) ?? [];
          const display = iso.toLocaleString(DateTime.DATE_MED);
          return (
            <li key={display}>
              <span>{display}: </span>
              {notices.map((notice, idx) => (
                <span key={notice}>
                  <a href={notice} target="_blank">
                    {notice.split("/").slice(-1)[0]}
                  </a>
                  {idx < notices.length - 1 ? ", " : ""}
                </span>
              ))}
            </li>
          );
        })}
    </ul>
  );
};

type LoadedProclaimedDatesProps = {
  proclamationsPromise: Promise<Proclamations>;
};
const LoadedProclaimedDates: React.FC<LoadedProclaimedDatesProps> = ({
  proclamationsPromise,
}) => {
  const dateToNotices = use(proclamationsPromise).dateToNotices;

  return (
    <>
      <h2>Dates proclaimed or ordered to be bank holidays</h2>
      {<LoadedProclaimedDatesList datesToNotices={dateToNotices.bhs} />}

      <h2>
        Dates proclaimed or ordered to <i>not</i> be bank holidays
      </h2>
      {<LoadedProclaimedDatesList datesToNotices={dateToNotices.nbhs} />}
    </>
  );
};

const ProclaimedDates: React.FC = () => {
  const proclamationsPromise = useMemo(() => getProclamations(), []);

  return (
    <>
      <h1>Proclaimed dates</h1>

      <Suspense fallback={<p>Loading...</p>}>
        <LoadedProclaimedDates proclamationsPromise={proclamationsPromise} />
      </Suspense>
    </>
  );
};

export default ProclaimedDates;
