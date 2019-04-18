import {DATABASE} from '../firebase.js';
import {feedback} from '../alert.js';

export const adicionarModulo = function(modulo) {
    DATABASE.ref(`modulo/${Date.now()}`)
        .set({
            nome: modulo.nome,
            privado: modulo.privado,
            criador: modulo.criador
        }).then(function() {
            feedback('#add-modulo-succsess-alert');
        }).catch(function() {
            feedback('#add-modulo-error-alert');
        });
};


export const deletarModulo = function() {
    const MODULO = DATABASE.ref(`modulo/${modulo}`);
    MODULO.remove();
};

export const buscaModulo = function(chaveModulo) {
    const ATIVIDADE = DATABASE.ref(`modulo/${chaveModulo}`);

    return new Promise(function(resolve) {
        ATIVIDADE.once('value', function(snapshot) {
            resolve(snapshot.val());
        });
    });
};

export const buscarTodosModulos = function() {
    const ARVORE_PAI = DATABASE.ref(`/modulo`);

    return new Promise(function(resolve) {
        ARVORE_PAI.once('value', function(snapshot) {
            resolve(snapshot.val());
        });
    });
};

export const editarModulo = function(chaveModulo, modulo) {
    DATABASE.ref(`modulo/${chaveModulo}`)
        .set({
            nome: modulo.nome,
            privado: modulo.privado,
            criador: modulo.criador
        }).then(function() {
            feedback('#add-modulo-succsess-alert');
        }).catch(function() {
            feedback('#add-modulo-error-alert');
        });
};