import {DATABASE} from './firebase.js';
import {feedback} from './alert.js';

export const setProgressoUsuario = function(userId, ordemVideo) {
    const atividades = localStorage.getItem('progresso')+';'+ordemVideo;
    DATABASE.ref(`/users/${userId}/progresso`).set({
        atividades: atividades
    });
};

export const getProgressoUsuario = function(userId) {
    const USER = DATABASE.ref(`/users/${userId}/progresso`);

    return new Promise(function(resolve) {
        USER.once('value', function(snapshot) {
            resolve(snapshot.val());
        });
    });
};

export const adicionarAtividade = function(atividade) {
    DATABASE.ref(`atividades/${Date.now()}`).set({
        codigo: atividade.codigo,
        tempoInicio: atividade.tempoInicio,
        tempoPause: atividade.tempoPause,
        pergunta: atividade.pergunta,
        resposta: atividade.resposta,
        alternativas: atividade.alternativas
    }).then(function() {
        feedback('#add-atividade-succsess-alert');
    }).catch(function() {
        feedback('#add-atividade-error-alert');
    });
};

export const excluirAtividade = function(key) {
    const ATIVIDADE = DATABASE.ref(`/atividades/${key}`);
    ATIVIDADE.remove();
    const TBODY = document.querySelector('#tbody');
    TBODY.innerHTML = '';
    buscarTodasAtividades();
};

export const buscaAtividade = function(chaveAtividade) {
    const ATIVIDADE = DATABASE.ref(`/atividades/${chaveAtividade}`);

    return new Promise(function(resolve) {
        ATIVIDADE.once('value', function(snapshot) {
            resolve(snapshot.val());
        });
    });
};

export const buscarTodasAtividades = function() {
    const ARVORE_PAI = DATABASE.ref('/atividades/');

    return new Promise(function(resolve) {
        ARVORE_PAI.once('value', function(snapshot) {
            resolve(snapshot.val());
        });
    });
};
