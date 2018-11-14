import {config} from './config.firebase.js';

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

//escutando status do firebase
firebase.auth().onAuthStateChanged(function(user) {
  const DIV_LOGADO = document.querySelector('#usuario-logado');

  if (user) {
    DIV_LOGADO.style.display = 'block';
    
    if (window.location.href.split('/')[3] === 'index.html' || window.location.href.split('/')[3] === '')
      window.location.replace('atividade.html');
  } else {
    DIV_LOGADO.style.display = 'none';
  }
});

//Ação de Login do botão #login
export const login = function(email, senha) {
  firebase.auth().signInWithEmailAndPassword(email, senha)
    .catch(function(error) { 
      const ALERT = document.querySelector('#login-alert');
      ALERT.style.display = 'block';
    });
};

// Ação de Login do botão #logout
export const logout = function() { 
  firebase.auth().signOut()
  .then(function() {
    console.log('Logout');
  }, function(error) {
    console.log(error);
  });
};

//Ação de criar do botão #create
export const cadastro = function(email, senha) { 
  firebase.auth().createUserWithEmailAndPassword(email, senha)
    .catch(function(error) {
      const ALERT = document.querySelector('#cadastro-alert');
      ALERT.style.display = 'block';
  });
};

//Ação de excluir do botão #delete
export const deletar = function() { 
  var user = firebase.auth().currentUser;
  user.delete().then(function() {
    window.location.replace('index.html');
  }).catch(function(error) {
    console.log(error);
  });  
};

//Ação de alterar senha do botão #update
export const alterarSenha = function(senha, confirmSenha) { 
  if (senha === confirmSenha) {
    firebase.auth().currentUser.updatePassword(senha)
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


