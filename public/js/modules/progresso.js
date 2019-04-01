import {getIdUsuario} from './firebase-auth.js';
import {getProgressoUsuario, buscarTodasAtividades,
    setProgressoUsuario} from './firebase-db.js';

export const getProgresso = function() {
    getIdUsuario()
        .then(getProgressoUsuario)
        .then(salvaProgresso);
};

const salvaProgresso = function(progresso) {
    localStorage.setItem('progresso', progresso.atividades);
};

export const atualizaBarraDeProgresso = function() {
    const PROGRESS_BAR = document.querySelector('.progress-bar');
    buscarTodasAtividades().then(quantTotalAtividades);
    getProgresso();
    const PROGRESSO =
        localStorage.getItem('progresso').split(';').length;
    const TOTAL = parseInt(localStorage.getItem('quantTotalAtividades'));
    const progresso = Math.round(((PROGRESSO - 1) * 100) / TOTAL);
    PROGRESS_BAR.setAttribute('style', `width: ${progresso}%`);
    PROGRESS_BAR.textContent = `${progresso}%`;
};

const quantTotalAtividades = function(OBJECT) {
    localStorage.setItem('quantTotalAtividades', Object.keys(OBJECT).length);
};

export const getAtividadeAtual = function() {
    return localStorage.getItem('progresso').split(';').reverse()[0];
};

export const salvaAtividadeAtual = function(OBJECT) {
    const INDICE = localStorage.getItem('progresso').split(';').reverse()[0];
    const CHAVES = Object.keys(OBJECT);
    localStorage.setItem('atividadeAtual', CHAVES[INDICE]);
};

export const setProximaAtividade = function(OBJECT) {
    getProgresso();
    const ATIVIDADE = getAtividadeAtual();
    const CHAVES = Object.keys(OBJECT);
    const PROXIMA_ATIVIDADE = parseInt(ATIVIDADE) + 1;
    if (CHAVES[PROXIMA_ATIVIDADE]) {
        const UID = localStorage.getItem('userid');
        setProgressoUsuario(UID, PROXIMA_ATIVIDADE);
        localStorage.setItem('atividadeAtual', CHAVES[PROXIMA_ATIVIDADE]);
    }
};
