import {logout, getIdUsuario} from './modules/firebase-auth.js';
import {buscaAtividade} from './modules/firebase-db.js';

const BTN_SAIR = document.querySelector('#sair');

BTN_SAIR.addEventListener('click', logout);

document.addEventListener('DOMContentLoaded', function() {
    getIdUsuario();    
    // buscaAtividade(getUid());
});
