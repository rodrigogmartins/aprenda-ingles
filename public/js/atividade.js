import {mostraAtividade} from './modules/atividade.js';
import {getIdUsuario} from './modules/firebase-auth.js';
import {setProximaAtividade} from './modules/crud/atividade.crud.js';
import {mostraBarraDeProgresso,
    getAtividadeAtual} from './modules/progresso.js';

const BUTTONS = document.querySelectorAll('.opcao');

document.addEventListener('DOMContentLoaded', function() {
    loadTagYoutube();
    mostraBarraDeProgresso();
    getAtividadeAtual()
        .then(mostraAtividade);
});

for (const BUTTON of BUTTONS) {
    BUTTON.addEventListener('click', function(event) {
        const OPCAO = event.target.textContent;

        getAtividadeAtual()
            .then(function(atividade) {
                verificaAcerto(OPCAO, atividade);
            });
    });
}

const verificaAcerto = function(opcao, atividade) {
    if (opcao === atividade.resposta) {
        getIdUsuario()
            .then(function(userId) {
                const MODULO = window.location.search.replace('?', '');

                setProximaAtividade(userId, MODULO);
            });
    }
};

const loadTagYoutube = function() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/player_api';

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
};
