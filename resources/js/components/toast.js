console.log('TOAST CARREGOU');

const toast = document.querySelector('.toast-item');

if (toast) {

    const btnClose = toast.querySelector('.toast-close');

    btnClose?.addEventListener('click', () => {

        toast.classList.add('hide');

        setTimeout(() => {

            toast.remove();

        }, 250);

    });

    fecharToast(toast);

}

function fecharToast(toast, duration = 4000) {

    setTimeout(() => {

        toast.classList.add('hide');

        setTimeout(() => {

            toast.remove();

        }, 250);

    }, duration);

}

function removerToast(container, toast) {

    toast.classList.add('hide');

    setTimeout(() => {

        container.remove();

    }, 250);

}

export function showToast({

    type = 'success',

    message = '',

    duration = 4000

}) {

    const tipos = {

        success: {
            titulo: 'Sucesso',
            icone: 'bi-check-circle-fill'
        },

        danger: {
            titulo: 'Erro',
            icone: 'bi-x-circle-fill'
        },

        warning: {
            titulo: 'Atenção',
            icone: 'bi-exclamation-triangle-fill'
        }

    };

    const config = tipos[type] ?? tipos.warning;

    document.querySelector('.toast-container-custom')?.remove();

    const container = document.createElement('div');

    container.className = 'toast-container-custom';

    container.innerHTML = `
        <div class="toast-item ${type}">

            <i class="bi ${config.icone} toast-icon"></i>

            <div class="toast-body">

                <div class="toast-title">
                    ${config.titulo}
                </div>

                <div class="toast-msg">
                    ${message}
                </div>

            </div>

            <button class="toast-close">

                <i class="bi bi-x"></i>

            </button>

            <div class="toast-progress"
                 style="--duration:${duration}ms"></div>

        </div>
    `;

    document.body.appendChild(container);

    const toast = container.querySelector('.toast-item');

    const btnClose = container.querySelector('.toast-close');

    btnClose.addEventListener('click', () => {

        removerToast(container, toast);

    });

    fecharToast(toast, duration);

}

window.showToast = showToast;