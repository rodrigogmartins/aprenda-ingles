import {DATABASE} from './firebase.js';

export const setProgressoUsuario = function(userId, progresso) {
    DATABASE.ref('/users/' + userId).set({
        progresso: progresso
    });
};

export const getProgressoUsuario = function(userId) {
    const USER = DATABASE.ref(`/users/${userId}/progresso`);

    USER.once('value', function(snapshot) {
        const OBJECT = snapshot.val();
        console.log(OBJECT);
    });
};

export const adicionarAtividade = function(atividade) {
    DATABASE.ref('atividades/'+Date.now()).set({
        codigo: atividade.codigo,
        url: atividade.url,
        tempoInicio: atividade.tempoInicio,
        tempoPause: atividade.tempoPause,
        pergunta: atividade.pergunta,
        resposta: atividade.resposta,
        alternativas: atividade.alternativas
    }).then(function() {
        const ALERT = document.querySelector('#add-atividade-succsess-alert');
        ALERT.style.display = 'block';
    }).catch(function() {
        const ALERT = document.querySelector('#add-atividade-error-alert');
        ALERT.style.display = 'block';
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
    const ATIVIDADE = DATABASE.ref(`/users/${chaveAtividade}/progresso`);

    ATIVIDADE.on('value', function(snapshot) {
        const OBJECT = snapshot.val();
        console.log(OBJECT);
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
