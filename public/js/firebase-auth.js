import {config} from './config.firebase.js';

firebase.initializeApp(config);

//escutando status do firebase
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if (window.location.href.split('/')[3] === 'index.html')
      window.location.replace('atividade.html');
  } else {
    if (window.location.href.split('/')[3] !== 'index.html')
      window.location.replace('index.html');
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

//Ação de alterar senha do botão #update
// document.getElementById("update").onclick = function() { 

// firebase.auth().currentUser.updatePassword('123mudar')
// .then(function() {
//     console.log('Senha Alterada!');
// })
// .catch(function(error) {
//     console.log(error);
// }); 


// };

//Ação de excluir do botão #delete
// document.getElementById("delete").onclick = function() { 


// var user = firebase.auth().currentUser;
// user.delete().then(function() {
//   // User deleted.
// }).catch(function(error) {
//   console.log( error );
// });

  
// };
