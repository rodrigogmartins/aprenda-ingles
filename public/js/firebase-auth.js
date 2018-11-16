import {AUTH} from './firebase.js';

AUTH.onAuthStateChanged(function(user) {
  const DIV_LOGADO = document.querySelector('#usuario-logado');

  if (user) {
    DIV_LOGADO.style.display = 'block';
    
    if (window.location.href.split('/')[3] === 'index.html' || window.location.href.split('/')[3] === '')
      window.location.replace('atividade.html');
  } else {
    DIV_LOGADO.style.display = 'none';
  }
});

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
    console.log('Logout');
  }, function(error) {
    console.log(error);
  });
};

export const cadastro = function(email, senha) { 
  AUTH.createUserWithEmailAndPassword(email, senha)
    .catch(function(error) {
      const ALERT = document.querySelector('#cadastro-alert');
      ALERT.style.display = 'block';
  });
};

export const deletar = function() { 
  var user = AUTH.currentUser;
  user.delete().then(function() {
    window.location.replace('index.html');
  }).catch(function(error) {
    console.log(error);
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


