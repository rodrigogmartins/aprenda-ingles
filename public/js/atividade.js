import {logout, getIdUsuario} from './modules/firebase-auth.js';
import {setProximaAtividade} from './modules/firebase-db';
import * as atividadeModules from './modules/atividade.js';
import * as progressoModules from './modules/progresso.js';

const BTN_SAIR = document.querySelector('#sair');
const BUTTONS = document.querySelectorAll('.opcao');

BTN_SAIR.addEventListener('click', logout);

document.addEventListener('DOMContentLoaded', function() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/player_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    progressoModules.mostraBarraDeProgresso();
    progressoModules.mostraAtividadeAtual(atividadeModules.mostraAtividade);
});


for (const BUTTON of BUTTONS) {
    BUTTON.addEventListener('click', function(event) {
        verificaAcerto(event);
    });
}

const verificaAcerto = function(event) {
    const OPCAO = event.target.textContent;
    const RESPOSTA = localStorage.getItem('resposta');
    if (OPCAO === RESPOSTA) {
        getIdUsuario()
            .then(function(uid) {
                const UID = uid;
                setProximaAtividade(UID);
            });
    }
};

