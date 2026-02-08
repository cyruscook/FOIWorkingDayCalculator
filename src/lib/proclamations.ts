import { DateTime } from "luxon";
import * as Collections from "typescript-collections";

export type NoticesToDate = Collections.Dictionary<string, DateTime[]>;
export type DateToNotices = Collections.Dictionary<DateTime, string[]>;

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

export const getProclamations = async function (): Promise<Proclamations> {
  const req1 = fetch(`${api_origin}/proclaimed_bhs.json`);
  const req2 = fetch(`${api_origin}/proclaimed_not_bhs.json`);
  const resp1 = (await req1).json();
  const resp2 = (await req2).json();
  const bhs: Record<string, string[]> = await resp1;
  const nbhs: Record<string, string[]> = await resp2;

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

  function strToDateTime(date: string): DateTime {
    return DateTime.fromISO(date).setZone("Europe/London", {
      keepLocalTime: true,
    });
  }

  for (const key of Object.keys(bhs)) {
    out.noticesToDate.bhs.setValue(key, bhs[key].map(strToDateTime));
  }
  for (const key of Object.keys(nbhs)) {
    out.noticesToDate.nbhs.setValue(key, nbhs[key].map(strToDateTime));
  }

  for (const notice of Object.keys(bhs)) {
    for (const date of bhs[notice]) {
      const datetime = strToDateTime(date);
      const notices = out.dateToNotices.bhs.getValue(datetime) || [];
      notices.push(notice);
      out.dateToNotices.bhs.setValue(datetime, notices);
    }
  }
  for (const notice of Object.keys(nbhs)) {
    for (const date of nbhs[notice]) {
      const datetime = strToDateTime(date);
      const notices = out.dateToNotices.nbhs.getValue(datetime) || [];
      notices.push(notice);
      out.dateToNotices.nbhs.setValue(datetime, notices);
    }
  }

  return out;
};
