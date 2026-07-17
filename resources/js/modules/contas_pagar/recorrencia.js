export function initRecorrencia() {

    const recorrenteSwitch = document.getElementById('recorrenteSwitch');
    const recorrenciaOptions = document.getElementById('recorrenciaOptions');

    const radios = document.querySelectorAll(
        'input[name="recorrencia_fim"]'
    );

    const dataFim = document.getElementById('recDataFim');
    const ocorrencias = document.getElementById('recQtdOcorrencias');

    function toggleRecorrencia() {

        recorrenciaOptions.classList.toggle(
            'd-none',
            !recorrenteSwitch.checked
        );

    }

    function atualizarTipoTermino() {

        dataFim.disabled = true;
        ocorrencias.disabled = true;

        const tipo = document.querySelector(
            'input[name="recorrencia_fim"]:checked'
        ).value;

        if (tipo === 'data') {
            dataFim.disabled = false;
        }

        if (tipo === 'ocorrencias') {
            ocorrencias.disabled = false;
        }

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

    toggleRecorrencia();
    atualizarTipoTermino();

}