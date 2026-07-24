import { consultarCnpj } from "../../api/receita";

const drawer = document.getElementById('fornecedorDrawer');
const backdrop = document.getElementById('fornecedorBackdrop');

const form = document.getElementById('formFornecedor');
const btnBuscar = document.getElementById("btnBuscarCnpj");

function openDrawer() {

    drawer.classList.add('open');
    backdrop.classList.add('show');

    document.body.style.overflow = 'hidden';

}

function closeDrawer() {

    drawer.classList.remove('open');
    backdrop.classList.remove('show');

    document.body.style.overflow = '';

}

function initDrawer() {

    const openBtn = document.querySelector('.cfr-add-client');
    const closeBtn = document.getElementById('closeFornecedorDrawer');
    const cancelBtn = document.getElementById('cancelFornecedor');

    openBtn.addEventListener('click', openDrawer);

    closeBtn.addEventListener('click', closeDrawer);

    cancelBtn.addEventListener('click', closeDrawer);

    backdrop.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', e => {

        if (e.key === 'Escape') {

            closeDrawer();

        }

    });

}

function initSalvarFornecedor() {

    form.addEventListener('submit', async function (e) {

        e.preventDefault();

        const formData = new FormData(form);

        try {

            const response = await fetch(form.action, {

                method: 'POST',

                headers: {
                    'X-CSRF-TOKEN': document
                        .querySelector('meta[name="csrf-token"]')
                        .content,

                    'Accept': 'application/json'
                },

                body: formData

            });

            const json = await response.json();

            if (!response.ok) {

                throw json;

            }

            showToast({
                type: 'success',
                message: json.message
            });

            closeDrawer();

            form.reset();

            const select = document.getElementById("fornecedorInput");

            const option = new Option(
                json.fornecedor.nome,
                json.fornecedor.id,
                true,
                true
            );

            select.add(option);
            select.value = json.fornecedor.id;

            select.dispatchEvent(new Event('change'));

        }
        catch (error) {

            if (error.errors) {

                showToast({

                    type: 'warning',

                    message: Object.values(error.errors)[0][0]

                });

                return;

            }

            showToast({

                type: 'danger',

                message: error.message ?? 'Erro ao cadastrar fornecedor.'

            })

        }

    });

}

function initConsultaCnpj() {

    const inputCnpj = form.querySelector('[name="cnpj"]');
    const inputNome = form.querySelector('[name="nome"]');

    if (!inputCnpj || !inputNome) {
        return;
    }

    inputCnpj.addEventListener('blur', async () => {

        const cnpj = inputCnpj.value.replace(/\D/g, '');

        if (cnpj.length !== 14) {
            return;
        }

        try {

            btnBuscar.disabled = true;
            btnBuscar.innerHTML = `
                <span class="spinner-border spinner-border-sm"></span>
            `;

            const response = await fetch(`/api/consultar-cnpj?cnpj=${cnpj}`, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao consultar CNPJ.');
            }

            inputNome.value = data.razao_social;

        } catch (error) {

            showToast({
                type: 'warning',
                message: error.message
            });

        } finally {

            btnBuscar.disabled = false;

            btnBuscar.innerHTML = `
                <i class="bi bi-search"></i>
            `;

        }

    });

}

export function initModalFornecedor() {

    initDrawer();
    initConsultaCnpj();
    initSalvarFornecedor();

}