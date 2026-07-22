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
    const parcelasFoot = document.getElementById('parcelasFoot');

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


            if (parcelasFoot) {
                parcelasFoot.innerHTML = '';
            }


            if (numeroParcelasInput) {
                numeroParcelasInput.value = '';
            }

        }

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

        atualizarTela();

    }



    // ==========================
    // Atualizar tela
    // ==========================

    function atualizarTela() {

        renderParcelas();

        atualizarResumo();

        atualizarRodape();

    }



    // ==========================
    // Render tabela
    // ==========================

    function renderParcelas() {

        if (!parcelasBody) {
            return;
        }

        parcelasWrap?.classList.remove('d-none');

        parcelasBody.innerHTML = '';

        parcelas.forEach((parcela, index) => {

            parcelasBody.insertAdjacentHTML(
                'beforeend',
                `
            <tr>

                <td>
                    ${parcela.numero}
                </td>

                <td>
                    <input
                        type="number"
                        class="form-control form-control-sm parcela-dias"
                        data-index="${index}"
                        value="${parcela.dias}">
                </td>

                <td>
                    <input
                        type="date"
                        class="form-control form-control-sm parcela-data fp-date"
                        data-index="${index}"
                        value="${parcela.vencimento}">
                </td>

                <td>
                    <input
                        type="text"
                        class="form-control form-control-sm parcela-valor"
                        data-index="${index}"
                        value="${formatCurrency(parcela.valor)}">
                </td>

                <td>
                    <button
                        type="button"
                        class="btn btn-sm btn-danger"
                        data-remove="${index}">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>

            </tr>
            `
            );

        });

        initFlatpickr();

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
    // Resumo
    // ==========================

    function atualizarResumo() {


        if (!parcelasSummary) {
            return;
        }


        const total = parcelas.reduce(
            (soma, parcela) =>
                soma + parcela.valor,
            0
        );



        parcelasSummary.innerHTML = `

            <strong>
                ${parcelas.length}
            </strong> parcela(s)

            <br>

            Total:
            <strong>
                ${formatCurrency(total)}
            </strong>

        `;


    }




    // ==========================
    // Rodapé tabela
    // ==========================

    function atualizarRodape() {

        if (!parcelasFoot) {
            return;
        }

        const total = parcelas.reduce(
            (soma, parcela) => soma + parcela.valor,
            0
        );

        const quantidade = parcelas.length;

        parcelasFoot.innerHTML = `
        <tr>

            <td colspan="3" class="cfr-foot-label">
                ${quantidade} parcela${quantidade !== 1 ? 's' : ''} no total
            </td>

            <td class="cfr-foot-total">
                ${formatCurrency(total)}
            </td>

            <td></td>

        </tr>
    `;

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



        atualizarTela();


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


        atualizarTela();

    }

}