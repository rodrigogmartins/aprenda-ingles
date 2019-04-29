import { DATABASE } from '../firebase.js';
import { feedback } from '../alert.js';

export const setProximaAtividade = function(userId, modulo) {
    getProgressoUsuario(userId)
        .then(function(progresso) {
            const MAP = new Map(Object.entries(progresso));
            const PROGRESSO_ANTIGO = MAP.get(modulo);
            let novoProgresso = '0';

            if (PROGRESSO_ANTIGO) {
                const proximaAtividade = getIndiceProximaAtividade(PROGRESSO_ANTIGO);
                novoProgresso = `${PROGRESSO_ANTIGO};${proximaAtividade}`;
            }

            return new Promise(function(resolve) {
                resolve(novoProgresso);
            });
        })
        .then(function(progresso) {
            const OBJETO = JSON.parse(`{"${modulo}":"${progresso}"}`);

            DATABASE.ref(`/users/${userId}/progresso`).set(OBJETO);
        }).then(function(modulo, progresso) {
            reload(modulo, progresso);
        });
};

const reload = function(modulo, atividade) {
    const HREF = window.location.href;
    const HASH = `#${modulo}&${atividade}`;
    window.location.href = HREF + HASH;
    window.location.reload();
};

const getIndiceProximaAtividade = function(progresso) {
    const indicesProgresso = progresso.split(';');
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

export const adicionarAtividade = function(modulo, atividade) {
    DATABASE.ref(`modulos/${modulo}/${Date.now()}`)
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
    const ATIVIDADE = DATABASE.ref(`modulos/${modulo}/${chaveAtividade}`);

    ATIVIDADE.remove();

    return new Promise(function(resolve) {
        resolve();
    })
};

export const buscaAtividade = function(modulo, chaveAtividade) {
    const ATIVIDADE = DATABASE.ref(`modulos/${modulo}/${chaveAtividade}`);

    return new Promise(function(resolve) {
        ATIVIDADE.once('value', function(snapshot) {
            resolve(snapshot.val());
        });
    });
};

export const buscarTodasAtividades = function(modulo) {
    const ARVORE_PAI = DATABASE.ref(`/modulos/${modulo}`);

    return new Promise(function(resolve) {
        ARVORE_PAI.once('value', function(snapshot) {
            resolve(snapshot.val());
        });
    });
};

export const editarAtividade = function(chaveAtividade, atividade) {
    DATABASE.ref(`modulos/${modulo}/${chaveAtividade}`).set({
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
