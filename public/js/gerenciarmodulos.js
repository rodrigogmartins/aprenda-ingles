import {buscarTodosModulos} from './modules/crud/modulo.crud';
import {montarTabelaDeModulos} from './modules/table.js';
import {getIdUsuario} from './modules/firebase-auth.js';

document.addEventListener('DOMContentLoaded', function() {
    const SPINNER = document.querySelector('.spinner');
    const CONTEUDO = document.querySelector('#conteudo');
    getIdUsuario()
        .then(function(userId) {
            buscarTodosModulos()
                .then(function(MODULOS) {
                    montarTabelaDeModulos(MODULOS, userId);

                    SPINNER.style.display = 'none';
                    CONTEUDO.style.display = 'block';
                });
        })
});
