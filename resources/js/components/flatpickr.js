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

        // Evita criar múltiplas instâncias no mesmo input
        if (input._flatpickr) {
            input._flatpickr.destroy();
        }

        const minFromSelector = input.dataset.minFrom;

        let minFromInput = null;

        if (minFromSelector) {

            minFromInput = document.querySelector(minFromSelector);

            if (minFromInput?.value) {

                config.minDate = minFromInput.value;
            }

        }

        const fp = flatpickr(input, config);

        // Atualiza a data mínima quando o campo origem mudar
        if (minFromInput) {

            minFromInput.addEventListener("change", () => {

                fp.set("minDate", minFromInput.value);

                // Se a data atual ficou inválida, limpa o campo
                if (
                    input.value &&
                    input.value < minFromInput.value
                ) {
                    fp.clear();
                }

            });

        }

        // Mantém o readonly do input original
        if (fp.altInput) {
            fp.altInput.readOnly = input.readOnly;
        }

    });

}