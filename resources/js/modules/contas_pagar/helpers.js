/**
 * Formata um número para moeda brasileira.
 */
export function formatCurrency(value) {
    return Number(value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

/**
 * Converte "1.234,56" para 1234.56
 */
export function parseCurrency(value) {

    if (value === null || value === undefined || value === '') {
        return 0;
    }

    if (typeof value === 'number') {
        return value;
    }

    return Number(
        value
            .toString()
            .replace(/[^\d,-]/g, '')
            .replace(/\./g, '')
            .replace(',', '.')
    ) || 0;

}

/**
 * Aplica máscara monetária.
 * Ex.: 123456 -> 1.234,56
 */
export function maskCurrency(value) {

    let numbers = value.replace(/\D/g, '');

    if (!numbers) {
        return '';
    }

    numbers = (parseInt(numbers, 10) / 100).toFixed(2);

    return Number(numbers).toLocaleString('pt-BR', {
        minimumFractionDigits: 2
    });
}

/**
 * Formata uma data YYYY-MM-DD para DD/MM/YYYY
 */
export function formatDateBR(date) {

    if (!date) {
        return '—';
    }

    const [year, month, day] = date.split('-');

    return `${day}/${month}/${year}`;
}

/**
 * Soma dias a uma data.
 */
export function addDays(date, days) {

    const newDate = new Date(date);

    newDate.setDate(newDate.getDate() + days);

    return newDate;
}

/**
 * Formata um objeto Date para YYYY-MM-DD
 */
export function formatDateInput(date) {

    return date.toISOString().substring(0, 10);
}

export function dividirValor(total, quantidade) {

    let restante = total;

    const valores = [];

    for (let i = 0; i < quantidade; i++) {

        const valor = i === quantidade - 1
            ? restante
            : +(total / quantidade).toFixed(2);

        restante -= valor;

        valores.push(valor);

    }

    return valores;

}

export function interpretarParcelas(valor) {

    valor = valor.trim();


    // Caso: 3x, 5x, 10x
    if (valor.toLowerCase().includes('x')) {

        const quantidade = Number(
            valor.replace('x', '')
        );


        if (!quantidade || quantidade <= 0) {
            return [];
        }


        return Array.from(
            { length: quantidade },
            (_, index) => (index + 1) * 30
        );

    }


    // Caso: 10 20 30
    const dias = valor
        .split(/\s+/)
        .map(Number)
        .filter(numero => numero > 0);


    return dias;

}

export function getSelectedText(select) {
    return select.selectedIndex > 0
        ? select.options[select.selectedIndex].text
        : '—';
}