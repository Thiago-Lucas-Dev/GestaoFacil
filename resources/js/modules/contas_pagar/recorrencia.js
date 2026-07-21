export function initRecorrencia() {

    const recorrenteSwitch = document.getElementById('recorrenteSwitch');
    const recorrenciaOptions = document.getElementById('recorrenciaOptions');

    const radios = document.querySelectorAll(
        'input[name="recorrencia_fim"]'
    );

    const dataFim = document.getElementById('recDataFim');
    const ocorrencias = document.getElementById('recQtdOcorrencias');

    const recIntervalo = document.getElementById('recIntervalo');
    const recPeriodo = document.getElementById('recPeriodo');

    function toggleRecorrencia() {

        recorrenciaOptions.classList.toggle(
            'd-none',
            !recorrenteSwitch.checked
        );

    }

    function atualizarTipoTermino() {

        dataFim.disabled = true;
        ocorrencias.disabled = true;

        if (dataFim._flatpickr?.altInput) {
            dataFim._flatpickr.altInput.disabled = true;
        }

        const tipo = document.querySelector(
            'input[name="recorrencia_fim"]:checked'
        ).value;

        if (tipo === 'data') {

            dataFim.disabled = false;

            if (dataFim._flatpickr?.altInput) {
                dataFim._flatpickr.altInput.disabled = false;
            }

        }

        if (tipo === 'ocorrencias') {
            ocorrencias.disabled = false;
        }

    }

    function obterRecorrencia() {

        const ativo = recorrenteSwitch.checked;

        const intervalo = Number(recIntervalo.value);

        const periodo = recPeriodo.value;

        const tipoFim = document.querySelector(
            'input[name="recorrencia_fim"]:checked'
        ).value;

        return {

            ativo,

            intervalo,

            periodo,

            tipoFim,

            dataFim: dataFim.value,

            ocorrencias: Number(ocorrencias.value)

        };

    }

    function atualizarResumoRecorrencia() {

        document.dispatchEvent(
            new CustomEvent(
                'recorrenciaChanged',
                {
                    detail: obterRecorrencia()
                }
            )
        );

    }

    recorrenteSwitch.addEventListener(
        'change',
        toggleRecorrencia
    );

    radios.forEach(radio => {
        radio.addEventListener(
            'change',
            atualizarTipoTermino
        );
    });

    recorrenteSwitch.addEventListener(
        'change',
        atualizarResumoRecorrencia
    );

    recIntervalo.addEventListener(
        'input',
        atualizarResumoRecorrencia
    );

    recPeriodo.addEventListener(
        'change',
        atualizarResumoRecorrencia
    );

    dataFim.addEventListener(
        'change',
        atualizarResumoRecorrencia
    );

    ocorrencias.addEventListener(
        'input',
        atualizarResumoRecorrencia
    );

    radios.forEach(radio => {

        radio.addEventListener(
            'change',
            atualizarResumoRecorrencia
        );

    });

    toggleRecorrencia();
    atualizarTipoTermino();
    atualizarResumoRecorrencia();

}