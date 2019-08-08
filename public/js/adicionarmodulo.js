import {Modulo} from './class/modulo.class.js';
import {adicionarModulo} from './modules/crud/modulo.crud.js';
import {getIdUsuario} from './modules/firebase-auth.js';

const FORM = document.querySelector('#add-modulo');

FORM.adicionarmodulo.addEventListener('click', function(e) {
    getIdUsuario()
        .then(function(criador) {
            const MODULO =
                new Modulo(FORM.nome.value, FORM.privado.checked, criador);

            adicionarModulo(MODULO);
            limparFormulario();
        });

    e.preventDefault();
});

const limparFormulario = function() {
    FORM.nome.value = '';
};
