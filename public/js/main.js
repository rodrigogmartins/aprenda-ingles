import {login, cadastro} from './modules/firebase-auth.js';

const BTN_ENTRAR = document.querySelector('#entrar');
const BTN_CADASTRO = document.querySelector('#cadastrar');

BTN_ENTRAR.addEventListener('click', function() {
    const EMAIL = document.querySelector('#email-login').value;
    const SENHA = document.querySelector('#senha-login').value;

    login(EMAIL, SENHA);
});

BTN_CADASTRO.addEventListener('click', function() {
    const EMAIL = document.querySelector('#email').value;
    const SENHA = document.querySelector('#senha').value;
    const CONF_SENHA = document.querySelector('#confirmar-senha').value;

    if (SENHA === CONF_SENHA) {
        cadastro(EMAIL, SENHA);
    }
});

const CLOSE = document.querySelectorAll('.fechar');
const ALERT = document.querySelectorAll('.alert');

for (let i = 0; i < CLOSE.length; i++) {
    CLOSE[i].addEventListener('click', function() {
        ALERT[i].style.display = 'none';
    });
}
