import { DateTime } from "luxon";
import { getProclamations } from './proclamations.js';

let proclamations = undefined;
try {
    proclamations = await getProclamations(window.location.origin);
} catch (error) {
    console.error("Failed to fetch proclamations", error);
}
if (proclamations !== undefined) {
    function addBhs(ul, bhs) {
        for (const bh of bhs) {
            let notice = bh.notice;
            let date = bh.date;
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.classList = ["govuk-link"];
            a.href = notice;
            a.innerText = date.toLocaleString(DateTime.DATE_MED);
            li.appendChild(a);
            ul.appendChild(li);
        }
    }

    function sortDates(bhs) {
        let newArr = [];
        for (const notice of Object.keys(bhs)) {
            for (const date of bhs[notice]) {
                newArr.push({
                    notice: notice,
                    date: date
                })
            }
        }
        newArr.sort((a, b) => {
            let adate = a.date;
            let bdate = b.date;
            if (adate < bdate) {
                return -1;
            } else if (adate > bdate) {
                return 1;
            } else {
                return 0;
            }
        });
        return newArr;
    }

    let bhs = sortDates(proclamations["bhs"]);
    let nbhs = sortDates(proclamations["nbhs"]);
    addBhs(document.querySelector("ul#bhs"), bhs);
    addBhs(document.querySelector("ul#nbhs"), nbhs);
} else {
    let errorHTML = `
    <div class="govuk-error-summary" data-module="govuk-error-summary">
        <div role="alert">
            <h2 class="govuk-error-summary__title">
                There is a problem
            </h2>
            <div class="govuk-error-summary__body">
                Could not fetch the proclamations.
            </div>
        </div>
    </div>
  `;
  let error = document.createElement("div");
  error.innerHTML = errorHTML;
  document.getElementById("#proclaimed-contents").parentElement.replaceChildren(error);
}
