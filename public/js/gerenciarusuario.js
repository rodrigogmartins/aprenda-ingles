import {alterarSenha, deletar} from './modules/crud/usuario.crud.js';

const BTN_ALTERAR = document.querySelector('#alterar');
const BTN_DELETE = document.querySelector('#delete-accont');
const CLOSE = document.querySelectorAll('.fechar');
const ALERT = document.querySelectorAll('.alert');

BTN_DELETE.addEventListener('click', deletar);

BTN_ALTERAR.addEventListener('click', function() {
    const SENHA = document.querySelector('#senha').value;
    const CONF_SENHA = document.querySelector('#confirmar-senha').value;

    alterarSenha(SENHA, CONF_SENHA);
});

for (let i = 0; i < CLOSE.length; i++) {
    CLOSE[i].addEventListener('click', function() {
        ALERT[i].style.display = 'none';
    });
}
