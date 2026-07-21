import { initCurrency } from './currency';
import { initParcelamento } from './parcelamento';
import { initSummary } from './summary';
import { initRecorrencia } from './recorrencia';
import { initStatus } from './status';
import { initToggles } from './toggles';
import { initModalFornecedor } from './modal_fornecedor';

function iniciarDatas() {

    const emissaoInput = document.getElementById('emissaoInput');

    if (!emissaoInput) {
        return;
    }


    const hoje = new Date();

    const data = hoje.toISOString()
        .substring(0, 10);


    emissaoInput.value = data;

}

export function initContaPagarCreate() {

    iniciarDatas();

    initCurrency();

    initParcelamento();

    initSummary();

    initRecorrencia();

    // initStatus();

    initToggles();

    initModalFornecedor();

}

document.addEventListener(
    'DOMContentLoaded',
    () => {

        initContaPagarCreate();

    }
);