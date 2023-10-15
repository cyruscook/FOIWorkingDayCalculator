import { DateTime } from "luxon";

export const getProclamations = async function(api_origin) {
    let req1 = fetch(`${api_origin}/proclaimed_bhs.json`);
    let req2 = fetch(`${api_origin}/proclaimed_not_bhs.json`);
    let resp1 = (await req1).json();
    let resp2 = (await req2).json();
    const bhs = await resp1;
    const nbhs = await resp2;

    function dateTimeMap(dates) {
        return dates.map((date) => DateTime.fromISO(date).setZone("Europe/London", { keepLocalTime: true }));
    }

    for (const key of Object.keys(bhs)) {
        bhs[key] = dateTimeMap(bhs[key]);
    }
    for (const key of Object.keys(nbhs)) {
        nbhs[key] = dateTimeMap(nbhs[key]);
    }

    return {
        "bhs": bhs,
        "nbhs": nbhs
    };
}
