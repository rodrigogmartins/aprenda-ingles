import {logout} from './modules/firebase-auth.js';

const BTN_SAIR = document.querySelector('#sair');

BTN_SAIR.addEventListener('click', logout);
