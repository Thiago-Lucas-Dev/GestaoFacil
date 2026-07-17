export function initStatus() {

    const statusOptions = document.getElementById('statusOptions');

    function selecionarStatus(event) {

        const button = event.target.closest('.cfr-status-opt');

        if (!button) {
            return;
        }

        statusOptions
            .querySelectorAll('.cfr-status-opt')
            .forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');

    }

    statusOptions.addEventListener(
        'click',
        selecionarStatus
    );

}