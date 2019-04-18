import {DATABASE} from '../firebase.js';
import {feedback} from '../alert.js';

export const setProximaAtividade = function(userId, modulo) {
    getProgressoUsuario(userId, modulo)
        .then(function(progresso) {
            let atividades = '0';

            if (progresso.atividades) {
                const proximaAtividade = getIndiceProximaAtividade(progresso);
                atividades = `${progresso.atividades};${proximaAtividade}`;
            }

            return new Promise(function(resolve) {
                resolve(atividades);
            });
        })
        .then(function(atv) {
            DATABASE.ref(`/users/${userId}/progresso/${modulo}`)
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
    const USER = DATABASE.ref(`/users/${userId}/progresso/${modulo}`);

    return new Promise(function(resolve) {
        USER.once('value', function(snapshot) {
            resolve(snapshot.val());
        });
    });
};

export const adicionarAtividade = function(modulo, atividade) {
    DATABASE.ref(`modulo/${modulo}/${Date.now()}`)
        .set({
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

export const excluirAtividade = function(modulo, chaveAtividade) {
    const ATIVIDADE = DATABASE.ref(`modulo/${modulo}/${chaveAtividade}`);
    ATIVIDADE.remove();

    return new Promise(function(resolve) {
        resolve();
    })
};

export const buscaAtividade = function(modulo, chaveAtividade) {
    const ATIVIDADE = DATABASE.ref(`modulo/${modulo}/${chaveAtividade}`);

    return new Promise(function(resolve) {
        ATIVIDADE.once('value', function(snapshot) {
            resolve(snapshot.val());
        });
    });
};

export const buscarTodasAtividades = function(modulo) {
    const ARVORE_PAI = DATABASE.ref(`/modulo/${modulo}`);

    return new Promise(function(resolve) {
        ARVORE_PAI.once('value', function(snapshot) {
            resolve(snapshot.val());
        });
    });
};

export const editarAtividade = function(chaveAtividade, atividade) {
    DATABASE.ref(`modulo/${modulo}/${chaveAtividade}`).set({
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
