import {DATABASE} from './firebase.js';

export const adicionarAtividade = function(atividade) {
    DATABASE.ref('atividades/'+atividade.codigo).set({
        url: atividade.url,
        tempoInicio: atividade.tempoInicio,
        tempoPause: atividade.tempoPause,
        pergunta: atividade.pergunta,
        resposta: atividade.resposta,
        alternativas: atividade.alternativas
    }).then(function() {
        const ALERT = document.querySelector('#add-atividade-succsess-alert');
        ALERT.style.display = 'block';        
    }).catch(function() {
        const ALERT = document.querySelector('#add-atividade-error-alert');
        ALERT.style.display = 'block';
    });
}

export const buscarAtividades = function() {
    const teste = DATABASE.ref('/atividades/');

    teste.on('value', function(snapshot) {
        console.log(snapshot.val()[0]);
    });
}
