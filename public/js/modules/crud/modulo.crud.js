import { DATABASE } from '../firebase.js';
import { feedback } from '../alert.js';
import { getIdUsuario } from '../firebase-auth.js';

export const adicionarModulo = function(modulo) {
    DATABASE.ref(`modulos/${Date.now()}`)
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

export const buscaModulo = function(chaveModulo) {
    const MODULO = DATABASE.ref(`modulos/${chaveModulo}`);

    return new Promise(function(resolve) {
        MODULO.once('value', function(snapshot) {
            resolve(snapshot.val());
        });
    });
};

export const buscarTodosModulos = function() {
    const ARVORE_PAI = DATABASE.ref(`modulos`);

    return new Promise(function(resolve) {
        ARVORE_PAI.once('value', function(snapshot) {
            resolve(snapshot.val());
        });
    });
};

export const editarModulo = function(chaveModulo, modulo) {
    const MODULO = DATABASE.ref(`modulos/${chaveModulo}`);

    MODULO.once('value', function(snapshot) {
        const PRIVADO = snapshot.val().privado;
        const CRIADOR = snapshot.val().criador;

        getIdUsuario().then(function(uid) {            
            if (!PRIVADO && uid === CRIADOR) {
                MODULO.set({
                    nome: modulo.nome,
                    privado: modulo.privado,
                    criador: modulo.criador
                }).then(function() {
                    feedback('#add-modulo-succsess-alert');
                }).catch(function() {
                    feedback('#add-modulo-error-alert');
                });
            }
        })
    });
};

export const deletarModulo = function(chaveModulo) {
    const MODULO = DATABASE.ref(`modulos/${chaveModulo}`);

    MODULO.once('value', function(snapshot) {
        const PRIVADO = snapshot.val().privado;
        const CRIADOR = snapshot.val().criador;
 
        getIdUsuario().then(function(uid) {            
            if (!PRIVADO && uid === CRIADOR) {
                MODULO.remove();
            }
        });
    });
};