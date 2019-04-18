import {AUTH} from './firebase.js';
import {feedback} from './alert.js';

AUTH.onAuthStateChanged(function(user) {
    const DIV_LOGADO = document.querySelector('#usuario-logado');
    if (user) {
        if (DIV_LOGADO) {
            DIV_LOGADO.style.display = 'block';
        }
    } else {
        if (DIV_LOGADO) {
            DIV_LOGADO.style.display = 'none';
        }
    }
});

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
            window.location.replace('atividade.html');
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
