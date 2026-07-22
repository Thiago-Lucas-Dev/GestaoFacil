import { initFlatpickr } from '../../components/flatpickr';
import {
    parseCurrency,
    formatCurrency,
    addDays,
    formatDateInput,
    dividirValor,
    interpretarParcelas
} from './helpers';


export function initParcelamento() {


    // ==========================
    // Elementos
    // ==========================

    const parcelaSwitch = document.getElementById('parcelaSwitch');
    const parcelaOptions = document.getElementById('parcelaOptions');

    const gerarParcelasBtn = document.getElementById('gerarParcelasBtn');

    const valorInput = document.getElementById('valorInput');
    const vencimentoInput = document.getElementById('vencimentoInput');

    const numeroParcelasInput = document.getElementById('numParcelas');

    const parcelasWrap = document.getElementById('parcelasWrap');
    const parcelasSummary = document.getElementById('parcelasSummary');

    const parcelasBody = document.getElementById('parcelasBody');

    const addParcelaBtn = document.getElementById('addParcelaBtn');


    // ==========================
    // Proteção
    // ==========================

    // console.log('iniciando parcelamento')

    if (!parcelaSwitch) {
        // console.log('não achou parcelamento')
        return;
    }


    // ==========================
    // Estado
    // ==========================

    let parcelas = [];


    // ==========================
    // Eventos
    // ==========================

    parcelaSwitch.addEventListener(
        'change',
        toggleParcelamento
    );


    gerarParcelasBtn?.addEventListener(
        'click',
        gerarParcelas
    );

    // console.log('botão gerar:', gerarParcelasBtn);


    addParcelaBtn?.addEventListener(
        'click',
        adicionarParcela
    );


    // ==========================
    // Inicialização
    // ==========================

    toggleParcelamento();



    // ==========================
    // Mostrar / esconder opções
    // ==========================

    function toggleParcelamento() {


        parcelaOptions?.classList.toggle(
            'd-none',
            !parcelaSwitch.checked
        );


        if (!parcelaSwitch.checked) {


            parcelas = [];


            parcelasWrap?.classList.add(
                'd-none'
            );


            if (parcelasBody) {
                parcelasBody.innerHTML = '';
            }


            if (parcelasSummary) {
                parcelasSummary.innerHTML = '';
            }

            if (numeroParcelasInput) {
                numeroParcelasInput.value = '';
            }

        }

    }

    // ==========================
    // Atualizar tela
    // ==========================

    function render() {

        renderResumo();

        renderTabela();

    }

    // ==========================
    // Resumo
    // ==========================

    function renderResumo() {


        if (!parcelasSummary) {
            return;
        }

        const total = parcelas.reduce(
            (soma, parcela) => soma + parcela.valor,
            0
        );

        const valorParcela =
            parcelas.length
                ? total / parcelas.length
                : 0;

        parcelasSummary.innerHTML = `

            <div class="cfr-ps-item">

                <div class="cfr-ps-label">
                    Parcelas
                </div>

                <div class="cfr-ps-val">
                    ${parcelas.length}x
                </div>

            </div>

            <div class="cfr-ps-item">

                <div class="cfr-ps-label">
                    Valor total
                </div>

                <div class="cfr-ps-val">
                    ${formatCurrency(total)}
                </div>

            </div>

            <div class="cfr-ps-item">

                <div class="cfr-ps-label">
                    Por parcela
                </div>

                <div class="cfr-ps-val">
                    ${formatCurrency(valorParcela)}
                </div>

            </div>

        `;


    }

    // ==========================
    // Render tabela
    // ==========================

    function renderTabela() {

        if (!parcelasBody) {
            return;
        }

        parcelasWrap?.classList.remove('d-none');

        parcelasBody.innerHTML =
            parcelas
                .map(renderLinha)
                .join('');

        initFlatpickr();

        bindTabelaEventos();

    }

    function renderLinha(parcela, index) {

        return `
                    <tr data-idx="${index}">

                        <td>
                            <span class="cfr-p-num">
                                ${parcela.numero}
                            </span>
                        </td>

                        <td>
                            <input
                                type="number"
                                class="cfr-cell-input input-dias"
                                data-index="${index}"
                                value="${parcela.dias}"
                                min="1">
                        </td>

                        <td>
                            <input
                                type="date"
                                class="cfr-cell-input input-data fp-date"
                                data-index="${index}"
                                value="${parcela.vencimento}">
                        </td>

                        <td>
                            <input
                                type="text"
                                class="cfr-cell-input input-valor"
                                data-index="${index}"
                                value="${formatCurrency(parcela.valor)}">
                        </td>

                        <td>

                            <button
                                type="button"
                                class="cfr-rm-btn"
                                data-remove="${index}">

                                <i class="bi bi-x-lg"></i>

                            </button>

                        </td>

                    </tr>  
        `;

    }

    function bindTabelaEventos() {

        bindRemover();

    }

    function bindRemover() {

        document
            .querySelectorAll('[data-remove]')
            .forEach(button => {

                button.addEventListener('click', () => {

                    removerParcela(
                        Number(button.dataset.remove)
                    );

                });

            });

    }

    // ==========================
    // Gerar parcelas
    // ==========================

    function gerarParcelas() {

        console.log('cliquei em gerar parcelas');


        const total = parseCurrency(
            valorInput.value
        );

        console.log('total:', total);


        if (!total || total <= 0) {
            return;
        }

        const regrasParcelas = interpretarParcelas(
            numeroParcelasInput.value
        );

        console.log('regras:', regrasParcelas);


        if (!regrasParcelas.length) {
            return;
        }

        const dataBase = new Date(
            vencimentoInput.value + 'T00:00:00'
        );


        if (isNaN(dataBase)) {
            return;
        }



        const valores = dividirValor(
            total,
            regrasParcelas.length
        );

        console.log('valores:', valores);


        parcelas = [];



        valores.forEach(
            (valor, index) => {

                const dias = regrasParcelas[index];


                const vencimento = addDays(
                    dataBase,
                    dias
                );


                parcelas.push({

                    numero: index + 1,

                    dias,

                    vencimento:
                        formatDateInput(vencimento),

                    valor

                });


            }
        );

        console.log(parcelas);

        render();

    }

    // ==========================
    // Adicionar parcela manual
    // ==========================

    function adicionarParcela() {


        const ultima =
            parcelas[parcelas.length - 1];



        parcelas.push({

            numero:
                parcelas.length + 1,


            dias:
                ultima
                    ? ultima.dias + 30
                    : 0,


            vencimento:
                ultima
                    ? formatDateInput(
                        addDays(
                            new Date(
                                ultima.vencimento +
                                'T00:00:00'
                            ),
                            30
                        )
                    )
                    : vencimentoInput.value,


            valor: ultima ? ultima.valor : 0

        });



        render();


    }

    // ==========================
    // Remover parcela
    // ==========================

    function removerParcela(index) {


        parcelas.splice(
            index,
            1
        );


        parcelas.forEach(
            (parcela, i) => {

                parcela.numero = i + 1;

            }
        );


        render();

    }

}