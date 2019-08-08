import {AUTH} from '../firebase.js';
import {feedback} from '../alert.js';

export const cadastro = function(email, senha) {
    AUTH.createUserWithEmailAndPassword(email, senha)
        .then(redirect)
        .catch(function() {
            feedback('#cadastro-alert');
        });
};

const redirect = function() {
    window.location.replace('modulos.html');
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
            .catch(function() {
                feedback('#update-unsuccess-alert');
            });
    } else {
        feedback('#update-unsuccess-alert');
    }
};
