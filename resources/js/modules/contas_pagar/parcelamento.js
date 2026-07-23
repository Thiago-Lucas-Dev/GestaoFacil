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

    const emissaoInput = document.getElementById('emissaoInput');
    const vencimentoInput = document.getElementById('vencimentoInput');

    console.log(vencimentoInput);

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


    addParcelaBtn?.addEventListener(
        'click',
        adicionarParcela
    );

    valorInput?.addEventListener(
        'change',
        atualizarValorConta
    );

    emissaoInput?.addEventListener(
        'change',
        atualizarDataEmissao
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

        if (parcelaSwitch.checked) {

            console.log('Readonly ON')

            vencimentoInput.readOnly = true;

        } else {

            console.log('Readonly OFF')

            vencimentoInput.readOnly = false;

        }


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

    function recalcularParcelas(opcoes = {}) {

        renumerarParcelas();

        recalcularDatas(opcoes);

        if (!opcoes.somenteDatas) {
            recalcularValores(opcoes);
        }

        atualizarVencimentoFinal();

        render();

    }

    function atualizarVencimentoFinal() {

        if (!parcelas.length) {
            vencimentoInput.value = '';
            return;
        }

        vencimentoInput.value =
            parcelas[parcelas.length - 1].vencimento;

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

        initFlatpickr("#parcelasBody .fp-date");

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

        bindValor();

        bindDias();

        bindData();

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

    function bindValor() {

        document
            .querySelectorAll('.input-valor')
            .forEach(input => {

                input.addEventListener('change', () => {

                    const index = Number(input.dataset.index);

                    console.log('Index:', index);
                    console.log('Digitado:', input.value);
                    console.log('Parse:', parseCurrency(input.value));

                    parcelas[index].valor = parseCurrency(input.value);

                    console.log('Antes do recalculo:', JSON.parse(JSON.stringify(parcelas)));

                    recalcularParcelas({
                        manterIndice: index
                    });

                    console.log('Depois do recalculo:', JSON.parse(JSON.stringify(parcelas)));

                });

            });

    }

    function bindDias() {

        document
            .querySelectorAll('.input-dias')
            .forEach(input => {

                input.addEventListener('change', () => {

                    const index = Number(input.dataset.index);

                    parcelas[index].dias = Number(input.value);

                    recalcularParcelas({
                        atualizarData: index,
                        somenteDatas: true
                    });

                });

            });

    }

    function bindData() {

        document
            .querySelectorAll('.input-data')
            .forEach(input => {

                input.addEventListener('change', () => {

                    const index = Number(input.dataset.index);

                    parcelas[index].vencimento = input.value;

                    recalcularParcelas({
                        atualizarDias: index,
                        somenteDatas: true
                    });

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

        if (!emissaoInput.value) {
            emissaoInput.focus();
            return;
        }

        const dataBase = new Date(
            emissaoInput.value + 'T00:00:00'
        );

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

                    id: crypto.randomUUID(),

                    numero: index + 1,

                    dias,

                    vencimento: formatDateInput(vencimento),

                    valor,

                    manual: false

                });


            }
        );

        recalcularParcelas();

    }

    function atualizarValorConta() {

        if (!parcelas.length) {
            return;
        }

        recalcularParcelas();

    }

    function atualizarDataEmissao() {

        console.log('evento emissão:', emissaoInput.value);

        if (!parcelas.length) {
            return;
        }

        recalcularParcelas({
            atualizarTodasDatas: true,
            somenteDatas: true
        });

    }

    function renumerarParcelas() {

        parcelas.forEach(
            (parcela, i) => {

                parcela.numero = i + 1;

            }
        );

    }

    function recalcularValores(opcoes = {}) {

        const { manterIndice = null } = opcoes;

        const totalConta = parseCurrency(valorInput.value);

        // ==========================
        // Caso 1
        // Alterou o valor TOTAL da conta
        // ==========================

        if (manterIndice === null) {

            const valores = dividirValor(
                totalConta,
                parcelas.length
            );

            parcelas.forEach((parcela, index) => {

                parcela.valor = valores[index];

            });

            return;
        }

        // ==========================
        // Caso 2
        // Alterou uma parcela
        // ==========================

        const valorFixo = parcelas[manterIndice].valor;

        const restante = totalConta - valorFixo;

        const novosValores = dividirValor(
            restante,
            parcelas.length - 1
        );

        let contador = 0;

        parcelas.forEach((parcela, index) => {

            if (index === manterIndice) {
                return;
            }

            parcela.valor = novosValores[contador++];

        });

    }

    function recalcularDatas(opcoes = {}) {

        console.log('data base:', emissaoInput.value);

        const {
            atualizarData = null,
            atualizarDias = null,
            atualizarTodasDatas = false
        } = opcoes;

        const dataBase = new Date(
            emissaoInput.value + 'T00:00:00'
        );

        // Dias -> Data
        if (atualizarData !== null) {

            parcelas[atualizarData].vencimento =
                formatDateInput(
                    addDays(
                        dataBase,
                        parcelas[atualizarData].dias
                    )
                );

        }

        // Data -> Dias
        if (atualizarDias !== null) {

            const vencimento = new Date(
                parcelas[atualizarDias].vencimento + 'T00:00:00'
            );

            const diferenca = Math.round(
                (vencimento - dataBase) / 86400000
            );

            parcelas[atualizarDias].dias = diferenca;

        }

        if (atualizarTodasDatas) {

            parcelas.forEach(parcela => {

                parcela.vencimento = formatDateInput(
                    addDays(
                        dataBase,
                        parcela.dias
                    )
                );

            });

        }

    }

    // ==========================
    // Adicionar parcela manual
    // ==========================

    function calcularProximaParcela() {

        if (!parcelas.length) {

            return {
                dias: 30,
                vencimento: emissaoInput.value
            };

        }

        const ultima = parcelas[parcelas.length - 1];

        let intervalo = 30;

        if (parcelas.length >= 2) {

            const penultima = parcelas[parcelas.length - 2];

            intervalo = ultima.dias - penultima.dias;

            if (intervalo <= 0) {
                intervalo = 30;
            }

        }

        const dias = ultima.dias + intervalo;

        const vencimento = formatDateInput(
            addDays(
                new Date(emissaoInput.value + 'T00:00:00'),
                dias
            )
        );

        return {
            dias,
            vencimento
        };

    }

    function adicionarParcela() {

        const proxima = calcularProximaParcela();

        parcelas.push({

            id: crypto.randomUUID(),

            numero: parcelas.length + 1,

            dias: proxima.dias,

            vencimento: proxima.vencimento,

            valor: 0,

            manual: false

        });

        recalcularParcelas();

    }

    function removerParcela(index) {

        parcelas.splice(index, 1);

        recalcularParcelas();

    }

}