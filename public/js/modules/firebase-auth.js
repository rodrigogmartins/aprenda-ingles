import {AUTH} from './firebase.js';
import {setProgressoUsuario} from './firebase-db.js';

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
            const ALERT = document.querySelector('#login-alert');
            ALERT.style.display = 'block';
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
            setProgressoUsuario(AUTH.currentUser.uid, 'abc');
        })
        .catch(function(error) {
            const ALERT = document.querySelector('#cadastro-alert');
            ALERT.style.display = 'block';
        });
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
                const ALERT = document.querySelector('#update-success-alert');
                ALERT.style.display = 'block';
            })
            .catch(function(error) {
                const ALERT = document.querySelector('#update-unsuccess-alert');
                ALERT.style.display = 'block';
            });
    } else {
        const ALERT = document.querySelector('#update-unsuccess-alert');
        ALERT.style.display = 'block';
    }
};
