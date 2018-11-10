import {login, cadastro} from './firebase-auth.js';

const BTN_ENTRAR = document.querySelector('#entrar');
const BTN_CADASTRO = document.querySelector('#cadastrar');

BTN_ENTRAR.addEventListener('click', function() {
    
    const EMAIL = document.querySelector('#email-login');
    const SENHA = document.querySelector('#senha-login');

    login(EMAIL, SENHA);

});

BTN_CADASTRO.addEventListener('click', function() {

    const EMAIL = document.querySelector('#email');
    const SENHA = document.querySelector('#senha');
    const CONF_SENHA = document.querySelector('#confirmar-senha');

    if (SENHA === CONF_SENHA) {
        cadastro(EMAIL, SENHA);
    }

});
