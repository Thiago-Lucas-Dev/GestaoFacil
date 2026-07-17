import {
    formatCurrency,
    parseCurrency,
    formatDateBR
} from './helpers';

export function initSummary() {

    // Campos do formulário
    const valorInput = document.getElementById('valorInput');
    const vencimentoInput = document.getElementById('vencimentoInput');
    const fornecedorInput = document.getElementById('fornecedorInput');
    const categoriaInput = document.getElementById('categoriaInput');

    // Campos do resumo
    const summaryValor = document.getElementById('summaryValor');
    const summaryVencimento = document.getElementById('summaryVencimento');
    const summaryFornecedor = document.getElementById('summaryCliente');
    const summaryCategoria = document.getElementById('summaryCategoria');

    function atualizarResumo() {

        summaryValor.textContent = formatCurrency(
            parseCurrency(valorInput.value)
        );

        summaryVencimento.textContent = formatDateBR(
            vencimentoInput.value
        );

        summaryFornecedor.textContent =
            fornecedorInput.value || '—';

        summaryCategoria.textContent =
            categoriaInput.value || '—';

    }

    // Atualização inicial
    atualizarResumo();

    // Eventos do formulário
    vencimentoInput.addEventListener('change', atualizarResumo);

    fornecedorInput.addEventListener('change', atualizarResumo);

    categoriaInput.addEventListener('change', atualizarResumo);

    // Evento vindo do currency.js
    document.addEventListener(
        'valorChanged',
        atualizarResumo
    );

}