import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_blue.css";
import { Portuguese } from "flatpickr/dist/l10n/pt.js";

export function initFlatpickr(selector = ".fp-date") {

    document.querySelectorAll(selector).forEach(input => {

        const config = {

            locale: Portuguese,

            dateFormat: "Y-m-d",

            altInput: true,
            altFormat: "d/m/Y",

            allowInput: true,

            disableMobile: true,

            monthSelectorType: "static",

            animate: true

        };

        // ===========================
        // COMPORTAMENTOS
        // ===========================

        if (
            input.classList.contains("fp-today") &&
            !input.value
        ) {
            input.value = new Date().toISOString().substring(0, 10);
        }

        if (input.classList.contains("fp-future")) {

            config.minDate = "today";

        }

        if (input.classList.contains("fp-past")) {

            config.maxDate = "today";

        }

        flatpickr(input, config);

    });

}