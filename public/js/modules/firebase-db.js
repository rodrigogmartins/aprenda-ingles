import {DATABASE} from './firebase.js';
import {feedback} from './alert.js';

export const setProximaAtividade = function(userId) {
    getProgressoUsuario(userId)
        .then(function(progresso) {
            let atividades = '0';

            if (progresso.atividades) {
                const proximaAtividade = getIndiceProximaAtividade(progresso);
                atividades = `${progresso.atividades};${proximaAtividade}`;
                return new Promise(function(resolve) {
                    resolve(atividades);
                });
            }
        })
        .then(function(atv) {
            DATABASE.ref(`/users/${userId}/progresso`)
                .set({
                    atividades: atv
                });
        }).then(reload);
};

const reload = function() {
    window.location.reload();
};

const getIndiceProximaAtividade = function(progresso) {
    const indicesProgresso = progresso.atividades.split(';');
    let ultimaAtividade = indicesProgresso[indicesProgresso.length-1];
    ultimaAtividade = parseInt(ultimaAtividade);
    return (ultimaAtividade + 1) + '';
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

export const editarAtividade = function(chaveAtividade, atividade) {
    DATABASE.ref(`/atividades/${chaveAtividade}`).set({
        codigo: atividade.codigo,
        tempoInicio: atividade.tempoInicio,
        tempoPause: atividade.tempoPause,
        pergunta: atividade.pergunta,
        resposta: atividade.resposta,
        alternativas: atividade.alternativas
    }).then(function() {
        feedback('#edit-atividade-succsess-alert');
    }).catch(function() {
        feedback('#edit-atividade-error-alert');
    });
};
