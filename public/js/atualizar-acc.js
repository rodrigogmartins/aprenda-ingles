import {alterarSenha} from './firebase-auth.js';

const BTN_ALTERAR = document.querySelector('#alterar');

BTN_ALTERAR.addEventListener('click', function() {

    const SENHA = document.querySelector('#senha').value;
    const CONF_SENHA = document.querySelector('#confirmar-senha').value;

    if (SENHA === CONF_SENHA) {
        alterarSenha(SENHA);
    }

});

const CLOSE = document.querySelectorAll('.fechar');
const ALERT = document.querySelectorAll('.alert');

for (let i = 0; i < CLOSE.length; i++) {
    CLOSE[i].addEventListener('click', function() {
        ALERT[i].style.display = 'none';
    });    
}
