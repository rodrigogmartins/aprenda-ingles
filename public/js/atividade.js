import {logout, getIdUsuario} from './modules/firebase-auth.js';
import {buscarTodasAtividades} from './modules/firebase-db.js';
import * as atividadeModules from './modules/atividade.js';
import * as progressoModules from './modules/progresso.js';

const BTN_SAIR = document.querySelector('#sair');
const BUTTONS = document.querySelectorAll('.opcao');

BTN_SAIR.addEventListener('click', logout);

document.addEventListener('DOMContentLoaded', function() {
    progressoModules.getProgresso();
    progressoModules.atualizaBarraDeProgresso();
    buscarTodasAtividades().then(function(r) {
        progressoModules.salvaAtividadeAtual(r);
        return buscarTodasAtividades();
    }).then(atividadeModules.mostraAtividade);
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
        getIdUsuario().then(atividadeModules.salvaUserId);
        buscarTodasAtividades().then(progressoModules.setProximaAtividade);
        progressoModules.getProgresso();
        progressoModules.atualizaBarraDeProgresso();
        buscarTodasAtividades().then(function(r) {
            progressoModules.salvaAtividadeAtual(r);
            return buscarTodasAtividades();
        }).then(atividadeModules.mostraAtividade);
    } else {
        console.log('errou');
    }
};

