
  
  //escutando status do firebase
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      //online
      document.getElementById("console").innerHTML = JSON.stringify( user );
    } else {
      document.getElementById("console").innerHTML = 'OffLine!';
    }
  });
  
  
  //Ação de Login do botão #login
  document.getElementById("login").onclick = function() { 
  
  
      firebase.auth().signInWithEmailAndPassword('email@email.com.br', '123mudar').catch(function(error) { 
    
    document.getElementById("console").innerHTML = JSON.stringify( error );
    
    });
  };
  
  
  //Ação de Login do botão #logout
  document.getElementById("logout").onclick = function() { 
  
    firebase.auth().signOut()
    .then(function() {
      document.getElementById("console").innerHTML = 'Logout';
    }, function(error) {
      document.getElementById("console").innerHTML = JSON.stringify( error );
    });
  
  };
  
  //Ação de alterar senha do botão #update
  document.getElementById("update").onclick = function() { 
  
  firebase.auth().currentUser.updatePassword('123mudar')
  .then(function() {
      document.getElementById("console").innerHTML = 'Senha Alterada!';
  })
  .catch(function(error) {
      document.getElementById("console").innerHTML = JSON.stringify( error );
  }); 
  
  
  };
  
  //Ação de criar do botão #create
  document.getElementById("create").onclick = function() { 
  
  
  firebase.auth().createUserWithEmailAndPassword('email@email.com.br', "123mudar").catch(function(error) {
    document.getElementById("console").innerHTML = JSON.stringify( error );
  });
  
   
  };
  
  //Ação de excluir do botão #delete
  document.getElementById("delete").onclick = function() { 
  
  
  var user = firebase.auth().currentUser;
  user.delete().then(function() {
    // User deleted.
  }).catch(function(error) {
    document.getElementById("console").innerHTML = JSON.stringify( error );
  });
  
  
   
  };
