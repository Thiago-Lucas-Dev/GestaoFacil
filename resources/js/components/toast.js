const toast = document.querySelector('.toast-item');

// if (!toast) return;

const fechar = () => {

    toast.classList.add('hide');

    setTimeout(() => {

        toast.remove();

    }, 250);

};

setTimeout(fechar, 4000);

