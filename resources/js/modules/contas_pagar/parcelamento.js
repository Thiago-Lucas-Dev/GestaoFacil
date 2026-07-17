import {
    parseCurrency,
    formatCurrency,
    addDays,
    formatDateInput,
    dividirValor,
    interpretarParcelas
} from './helpers'; ''


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
    const intervaloParcelasInput = document.getElementById('intervaloParcelas');

    const parcelasWrap = document.getElementById('parcelasWrap');
    const parcelasSummary = document.getElementById('parcelasSummary');

    const parcelasBody = document.getElementById('parcelasBody');
    const parcelasFoot = document.getElementById('parcelasFoot');

    const addParcelaBtn = document.getElementById('addParcelaBtn');


    // ==========================
    // Proteção
    // ==========================

    console.log('iniciando parcelamento')

    if (!parcelaSwitch) {
        console.log('não achou parcelamento')
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

    console.log('botão gerar:', gerarParcelasBtn);


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


            numeroParcelasInput.value = '';
            intervaloParcelasInput.value = '';

        }

    }



    // ==========================
    // Gerar parcelas
    // ==========================

    function gerarParcelas() {


        const total = parseCurrency(
            valorInput.value
        );


        if (!total || total <= 0) {
            return;
        }

        const regrasParcelas = interpretarParcelas(
            numeroParcelasInput.value
        );


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


        parcelasWrap.classList.remove(
            'd-none'
        );


        parcelasBody.innerHTML = '';



        parcelas.forEach(
            (parcela, index) => {


                parcelasBody.insertAdjacentHTML(
                    'beforeend',
                    `

                    <tr>

                        <td>
                            ${parcela.numero}
                        </td>


                        <td>
                            ${parcela.dias}
                        </td>


                        <td>
                            ${parcela.vencimento}
                        </td>


                        <td>
                            ${formatCurrency(parcela.valor)}
                        </td>


                        <td>

                            <button 
                                type="button"
                                class="btn btn-sm btn-danger"
                                data-remove="${index}"
                            >
                                Remover
                            </button>

                        </td>


                    </tr>

                    `
                );


            }
        );



        document
            .querySelectorAll('[data-remove]')
            .forEach(button => {


                button.addEventListener(
                    'click',
                    () => {

                        removerParcela(
                            Number(
                                button.dataset.remove
                            )
                        );

                    }
                );


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
            (soma, parcela) =>
                soma + parcela.valor,
            0
        );



        parcelasFoot.innerHTML = `

            <tr>

                <th colspan="4">
                    Total
                </th>


                <th>
                    ${formatCurrency(total)}
                </th>


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


            valor: 0

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



    // ==========================
    // Atualizações futuras
    // ==========================

    function atualizarValor(index, valor) {


        parcelas[index].valor =
            valor;


        atualizarTela();

    }



    function atualizarDias(index, dias) {


        parcelas[index].dias =
            dias;


        atualizarTela();

    }



    function atualizarVencimento(index, vencimento) {


        parcelas[index].vencimento =
            vencimento;


        atualizarTela();

    }


}