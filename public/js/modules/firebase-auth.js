import { AUTH } from './firebase.js';
import { feedback } from './alert.js';
import { getProgressoUsuario } from './crud/atividade.crud.js';

// AUTH.onAuthStateChanged(function(user) {
//     if (user) {
//         logado
//     } else {
//         nao-logado
//     }
// });

export const getIdUsuario = function() {
    return new Promise(function(resolve) {
        AUTH.onAuthStateChanged(function(user) {
            if (user) {
                resolve(user.uid);
            } else {
                resolve('anonimo');
            }
        });
    });
};

export const login = function(email, senha) {
    AUTH.signInWithEmailAndPassword(email, senha)
        .then(function() {
            window.location.replace('modulos.html');
        })
        .catch(function(error) {
            feedback('#login-alert');
        });
};

export const logout = function() {
    AUTH.signOut()
        .then(function() {
            window.location.replace('index.html');
        });
};
