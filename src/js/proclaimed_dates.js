import { DateTime } from "luxon";
import { getProclamations } from "./proclamations.js";

let proclamations = undefined;
try {
	proclamations = await getProclamations(
		`https://d7rpp5pzwp0ap.cloudfront.net`,
	);
} catch (error) {
	console.error("Failed to fetch proclamations", error);
}
if (proclamations !== undefined) {
	function addBhs(ul, bhs) {
		for (const date of Object.keys(bhs).sort()) {
			let notices = bhs[date].notices;
			let li = document.createElement("li");
			let span = document.createElement("span");
			span.innerText = `${date.toLocaleString(DateTime.DATE_MED)}: `;

			function seperator() {
				let out = document.createElement("span");
				out.innerText = ", ";
				return out;
			}

			notices.forEach((notice, index, array) => {
				let a = document.createElement("a");
				a.classList = ["govuk-link"];
				a.href = notice;
				a.innerText = notice.split("/").slice(-1)[0];
				span.appendChild(a);

				if (array.length - 1 !== index) {
					li.appendChild(seperator());
				}
			});

			li.appendChild(span);
			ul.appendChild(li);
		}
	}

	addBhs(document.querySelector("ul#bhs"), proclamations.dateToNotices.bhs);
	addBhs(document.querySelector("ul#nbhs"), proclamations.dateToNotices.nbhs);
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
	document
		.getElementById("#proclaimed-contents")
		.parentElement.replaceChildren(error);
}
