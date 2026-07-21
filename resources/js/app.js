import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();

import 'bootstrap';
import "./pages/dashboard";
import "./pages/movimentacoes";
import "./pages/configuracoes";

// <!--================================
//            COMPONENTS
// =================================-->

import "./components/toast";

import { initFlatpickr } from './components/flatpickr';

// <!----------------------------------
//     INICIALIZAÇÃO DO flatpickr
// ---------------------------------->

document.addEventListener("DOMContentLoaded", () => {
    initFlatpickr();
})
