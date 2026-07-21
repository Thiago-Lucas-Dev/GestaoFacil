const drawer = document.getElementById('fornecedorDrawer');
const backdrop = document.getElementById('fornecedorBackdrop');

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

    const form = document.getElementById('formFornecedor');

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

            console.log(response.status);
            console.log(await response.text());

            const json = await response.json();

            if (!response.ok) {

                throw json;

            }

            showToast({
                type: 'success',

                message: json.message
            });

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

initDrawer();
initSalvarFornecedor();