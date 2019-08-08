import {DATABASE} from '../firebase.js';
import {feedback} from '../alert.js';

export const setAtividadeInicial = function(userId, modulo) {
    const OBJETO = JSON.parse(`{"${modulo}": "0;" }`);

    DATABASE.ref(`/users/${userId}/progresso`)
        .update(OBJETO);
};

export const setProximaAtividade = function(userId, modulo) {
    const mdl = modulo;
    getProgressoUsuario(userId)
        .then(function(progresso) {
            const MAP = new Map(Object.entries(progresso));
            const PROGRESSO_ANTIGO = MAP.get(mdl);
            let novoProgresso = '0;';

            if (PROGRESSO_ANTIGO !== undefined) {
                const proximaAtividade =
                    getIndiceProximaAtividade(PROGRESSO_ANTIGO);
                novoProgresso = `${PROGRESSO_ANTIGO}${proximaAtividade};`;
            }

            return new Promise(function(resolve) {
                resolve([modulo, novoProgresso]);
            });
        })
        .then(function(progresso) {
            const OBJETO = JSON.parse(`{"${progresso[0]}":"${progresso[1]}"}`);

            DATABASE.ref(`/users/${userId}/progresso`).update(OBJETO);

            return new Promise(function(resolve) {
                resolve(progresso);
            });
        }).then(reload);
};

const reload = function(progresso) {
    window.location.replace(`atividade.html?${progresso[0]}`);
    window.location.reload();
};

const getIndiceProximaAtividade = function(progresso) {
    const TODAS_ATIVIDADES = JSON.parse(localStorage.getItem('todasAtividades'));
    let TOTAL_ATIVIDADES = Object.keys(TODAS_ATIVIDADES);
    TOTAL_ATIVIDADES = TOTAL_ATIVIDADES.length - 3;
    const indicesProgresso = progresso.split(';');
    let ultimaAtividade = indicesProgresso[indicesProgresso.length-2];
    ultimaAtividade = parseInt(ultimaAtividade);
    ultimaAtividade++;

    if (TOTAL_ATIVIDADES > ultimaAtividade) {
        return (ultimaAtividade) + '';
    } else {
        return '0';
    }

};

export const getProgressoUsuario = function(userId) {
    const USER = DATABASE.ref(`/users/${userId}/progresso`);

    return new Promise(function(resolve) {
        USER.once('value', function(snapshot) {
            resolve(snapshot.val());
        });
    });
};

export const getProgressoModuloUsuario = function(userId, modulo) {
    const USER = DATABASE.ref(`/users/${userId}/progresso/${modulo}`);

    return new Promise(function(resolve) {
        USER.once('value', function(snapshot) {
            resolve(snapshot.val());
        });
    });
};

export const adicionarAtividadeVideo = function(modulo, atividade) {
    DATABASE.ref(`modulos/${modulo}/${Date.now()}`)
        .set({
            codigo: atividade.codigo,
            tempoInicio: atividade.tempoInicio,
            tempoPause: atividade.tempoPause,
            pergunta: atividade.pergunta,
            resposta: atividade.resposta,
            alternativas: atividade.alternativas,
            tipo: atividade.tipo
        })
        .then(function() {
            feedback('#add-atividade-succsess-alert');
        }).catch(function() {
            feedback('#add-atividade-error-alert');
        });
};

export const adicionarAtividadeTraducaoParcial = function(modulo, atividade) {
    DATABASE.ref(`modulos/${modulo}/${Date.now()}`)
        .set({
            texto: atividade.texto,
            resposta: atividade.resposta,
            alternativas: atividade.alternativas,
            tipo: atividade.tipo
        })
        .then(function() {
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
    });
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

export const editarAtividadeVideo = function(modulo, chaveAtividade, atividade) {
    DATABASE.ref(`modulos/${modulo}/${chaveAtividade}`)
        .set({
            codigo: atividade.codigo,
            tempoInicio: atividade.tempoInicio,
            tempoPause: atividade.tempoPause,
            pergunta: atividade.pergunta,
            resposta: atividade.resposta,
            alternativas: atividade.alternativas
        }).then(function() {
            feedback('#edit-atividade-video-succsess-alert');
        }).catch(function() {
            feedback('#edit-atividade-video-error-alert');
        });
};

export const editarAtividadeTraducaoParcial = function(modulo, chaveAtividade, atividade) {
    DATABASE.ref(`modulos/${modulo}/${chaveAtividade}`)
        .set({
            texto: atividade.texto,
            resposta: atividade.resposta,
            alternativas: atividade.alternativas,
            tipo: atividade.tipo
        }).then(function() {
            feedback('#edit-atividade-trad-parc-succsess-alert');
        }).catch(function() {
            feedback('#edit-atividade-trad-parc-error-alert');
        });
};
