import {
    formatCurrency,
    parseCurrency,
    formatDateBR,
    getSelectedText
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
    const summaryFornecedor = document.getElementById('summaryFornecedor');
    const summaryCategoria = document.getElementById('summaryCategoria');

    const summaryParcelado =
        document.getElementById('summaryParcelado');

    const summaryRecorrencia =
        document.getElementById('summaryRecorrencia');

    const summaryParcelas =
        document.getElementById('summaryParcelas');

    const summaryProximoVencimento =
        document.getElementById('summaryProximoVencimento');

    const summaryUltimoVencimento =
        document.getElementById('summaryUltimoVencimento');

    const summaryRecorrenciaTipo =
        document.getElementById('summaryRecorrenciaTipo');

    const summaryRecorrenciaVencimento =
        document.getElementById('summaryRecorrenciaVencimento');

    const summaryRecorrenciaFim =
        document.getElementById('summaryRecorrenciaFim');

    function atualizarResumoBase() {

        summaryValor.textContent = formatCurrency(
            parseCurrency(valorInput.value)
        );

        summaryVencimento.textContent = formatDateBR(
            vencimentoInput.value
        );

        summaryFornecedor.textContent = getSelectedText(fornecedorInput);

        summaryCategoria.textContent = getSelectedText(categoriaInput);

    }

    // <!----------------------------------
    //     RESUMO PARCELAMENTO 
    // ---------------------------------->

    function mostrarResumoParcelado() {

        summaryParcelado.classList.remove('d-none');

    }

    function atualizarResumoParcelamento(dados) {

        if (!dados.ativo) {

            esconderResumoParcelado();

            return;

        }

        mostrarResumoParcelado();

        summaryParcelas.textContent =
            `${dados.quantidade}x`;

        summaryProximoVencimento.textContent =
            formatDateBR(dados.primeiraData);

        summaryUltimoVencimento.textContent =
            formatDateBR(dados.ultimaData);

    }

    function esconderResumoParcelado() {

        summaryParcelado.classList.add('d-none');

    }

    // <!---------------------------------
    //     RESUMO RECORRENCIA
    // ---------------------------------->

    function mostrarResumoRecorrencia() {

        summaryRecorrencia.classList.remove('d-none');

    }

    function atualizarResumoRecorrencia(dados) {

        if (!dados.ativo) {

            esconderResumoRecorrencia();

            return;

        }

        mostrarResumoRecorrencia();

        let texto = '';

        switch (dados.periodo) {

            case 'dias':
                texto = dados.intervalo === 1
                    ? 'Diariamente'
                    : `A cada ${dados.intervalo} dias`;
                break;

            case 'semanas':
                if (dados.intervalo === 1) {
                    texto = 'Semanal';
                } else if (dados.intervalo === 2) {
                    texto = 'Quinzenal';
                } else {
                    texto = `A cada ${dados.intervalo} semanas`;
                }
                break;

            case 'meses':
                if (dados.intervalo === 1) {
                    texto = 'Mensal';
                } else if (dados.intervalo === 2) {
                    texto = 'Bimestral';
                } else if (dados.intervalo === 3) {
                    texto = 'Trimestral';
                } else if (dados.intervalo === 6) {
                    texto = 'Semestral';
                } else {
                    texto = `A cada ${dados.intervalo} meses`;
                }
                break;

            case 'anos':
                texto = dados.intervalo === 1
                    ? 'Anual'
                    : `A cada ${dados.intervalo} anos`;
                break;
        }

        summaryRecorrenciaTipo.textContent = texto;

        switch (dados.tipoFim) {

            case 'indefinido':
                summaryRecorrenciaFim.textContent = 'Sem término';
                break;

            case 'data':
                summaryRecorrenciaFim.textContent =
                    formatDateBR(dados.dataFim);
                break;

            case 'ocorrencias':
                summaryRecorrenciaFim.textContent =
                    `${dados.ocorrencias} ocorrência(s)`;
                break;
        }

    }

    function esconderResumoRecorrencia() {

        summaryRecorrencia.classList.add('d-none');

    }

    // INICIALIZAÇÃO 

    esconderResumoParcelado();

    esconderResumoRecorrencia();

    // Atualização inicial
    atualizarResumoBase();

    // Eventos do formulário
    vencimentoInput.addEventListener('change', atualizarResumoBase);

    fornecedorInput.addEventListener('change', atualizarResumoBase);

    categoriaInput.addEventListener('change', atualizarResumoBase);

    // Evento vindo do currency.js
    document.addEventListener(
        'valorChanged',
        atualizarResumoBase
    );

    document.addEventListener(
        'recorrenciaChanged',
        (e) => {

            atualizarResumoRecorrencia(
                e.detail
            );

        }
    );

    document.addEventListener(
        'parcelamentoChanged',
        (e) => {

            atualizarResumoParcelamento(
                e.detail
            );

        }
    );

}