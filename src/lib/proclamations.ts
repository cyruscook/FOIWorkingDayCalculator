import { DateTime } from "luxon";
import * as Collections from "typescript-collections";

export type NoticesToDate = Collections.Dictionary<string, DateTime[]>;
export type DateToNotices = Collections.Dictionary<DateTime, string[]>;

type HolidayDatesByTerritory = Record<string, string[]>;
type HolidayData = Record<string, HolidayDatesByTerritory>;

export type Proclamations = {
  noticesToDate: {
    bhs: NoticesToDate;
    nbhs: NoticesToDate;
  };
  dateToNotices: {
    bhs: DateToNotices;
    nbhs: DateToNotices;
  };
};

const api_origin = `https://d7rpp5pzwp0ap.cloudfront.net`;

function strToDateTime(date: string): DateTime {
  return DateTime.fromISO(date).setZone("Europe/London", {
    keepLocalTime: true,
  });
}

function addHolidayData(
  holidayData: HolidayData,
  noticesToDate: NoticesToDate,
  dateToNotices: DateToNotices,
): void {
  for (const [notice, datesByTerritory] of Object.entries(holidayData)) {
    const dates = [
      ...new Set(Object.values(datesByTerritory).flat()),
    ].map(strToDateTime);
    noticesToDate.setValue(notice, dates);

    for (const datetime of dates) {
      const notices = dateToNotices.getValue(datetime) || [];
      notices.push(notice);
      dateToNotices.setValue(datetime, notices);
    }
  }
}

export const getProclamations = async function (): Promise<Proclamations> {
  const req1 = fetch(`${api_origin}/proclaimed_bhs.json`);
  const req2 = fetch(`${api_origin}/proclaimed_not_bhs.json`);
  const resp1 = (await req1).json();
  const resp2 = (await req2).json();
  const bhs: HolidayData = await resp1;
  const nbhs: HolidayData = await resp2;

  const out = {
    noticesToDate: {
      bhs: new Collections.Dictionary<string, DateTime[]>(),
      nbhs: new Collections.Dictionary<string, DateTime[]>(),
    },
    dateToNotices: {
      bhs: new Collections.Dictionary<DateTime, string[]>(),
      nbhs: new Collections.Dictionary<DateTime, string[]>(),
    },
  };

  addHolidayData(bhs, out.noticesToDate.bhs, out.dateToNotices.bhs);
  addHolidayData(nbhs, out.noticesToDate.nbhs, out.dateToNotices.nbhs);

  return out;
};
