export function initToggles() {

    const parcelaSwitch =
        document.getElementById("parcelaSwitch");

    const recorrenteSwitch =
        document.getElementById("recorrenteSwitch");

    parcelaSwitch.addEventListener("change", () => {

        if (!parcelaSwitch.checked) return;

        recorrenteSwitch.checked = false;

        recorrenteSwitch.dispatchEvent(
            new Event("change")
        );

    });

    recorrenteSwitch.addEventListener("change", () => {

        if (!recorrenteSwitch.checked) return;

        parcelaSwitch.checked = false;

        parcelaSwitch.dispatchEvent(
            new Event("change")
        );

    });

}