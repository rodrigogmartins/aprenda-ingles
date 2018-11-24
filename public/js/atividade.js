import {logout, getIdUsuario} from './modules/firebase-auth.js';
import {buscarTodasAtividades, buscaAtividade} from './modules/firebase-db.js';
import * as atividadeModules from './modules/atividade.js';
import * as progressoModules from './modules/progresso.js';

const BTN_SAIR = document.querySelector('#sair');
const BUTTONS = document.querySelectorAll('.opcao');

BTN_SAIR.addEventListener('click', logout);

document.addEventListener('DOMContentLoaded', function() {
    progressoModules.getProgresso();
    progressoModules.atualizaBarraDeProgresso();
    setTimeout(function() {
        buscarTodasAtividades().then(progressoModules.salvaAtividadeAtual);
    }, 15000);
    setTimeout(function() {
        buscarTodasAtividades().then(atividadeModules.mostraAtividade);
    }, 15000);
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
        setTimeout(function() {
            buscarTodasAtividades().then(progressoModules.salvaAtividadeAtual);
        }, 15000);
        setTimeout(function() {
            buscarTodasAtividades().then(atividadeModules.mostraAtividade);
        }, 15000);
    } else {
        console.log('errou');
    }
};

