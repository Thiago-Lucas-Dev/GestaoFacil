import { maskCurrency } from './helpers';

export function initCurrency() {

    const valorInput = document.getElementById('valorInput');

    if (!valorInput) {
        return;
    }

    valorInput.addEventListener('input', () => {

        valorInput.value = maskCurrency(valorInput.value);

        document.dispatchEvent(
            new CustomEvent('valorChanged')
        );

    });

}