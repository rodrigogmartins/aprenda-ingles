import {AUTH} from './firebase.js';
import {setProgressoUsuario, buscarTodasAtividades} from './firebase-db.js';
import {feedback} from './alert.js';

AUTH.onAuthStateChanged(function(user) {
    const DIV_LOGADO = document.querySelector('#usuario-logado');
    if (user) {
        if (DIV_LOGADO) {
            DIV_LOGADO.style.display = 'block';
        }

        if (window.location.href.split('/')[3] === 'index.html'
            || window.location.href.split('/')[3] === '') {
            window.location.replace('atividade.html');
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
            buscarTodasAtividades().then(setPrimeiraAtividade);
        })
        .catch(function(error) {
            feedback('#cadastro-alert');
        });
};

const setPrimeiraAtividade = function(OBJECT) {
    const CHAVES = Object.keys(OBJECT);
    setProgressoUsuario(AUTH.currentUser.uid, CHAVES[0]);
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
