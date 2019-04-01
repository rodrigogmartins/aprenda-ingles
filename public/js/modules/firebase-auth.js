import {AUTH} from './firebase.js';
import {setProgressoUsuario} from './firebase-db.js';
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
            resolve(user.uid);
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

export const cadastro = function(email, senha) {
    AUTH.createUserWithEmailAndPassword(email, senha)
        .then(function() {
            setProgressoUsuario(AUTH.currentUser.uid, '0');
        })
        .then(redirect)
        .catch(function(error) {
            feedback('#cadastro-alert');
        });
};

const redirect = function() {
    window.location.replace('atividade.html');
};

export const deletar = function() {
    const USER = AUTH.currentUser;
    USER.delete()
        .then(function() {
            window.location.replace('index.html');
        });
};

export const alterarSenha = function(senha, confirmSenha) {
    if (senha === confirmSenha) {
        AUTH.currentUser.updatePassword(senha)
            .then(function() {
                feedback('#update-success-alert');
            })
            .catch(function(error) {
                feedback('#update-unsuccess-alert');
            });
    } else {
        feedback('#update-unsuccess-alert');
    }
};
