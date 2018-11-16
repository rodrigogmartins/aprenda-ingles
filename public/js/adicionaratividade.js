import {Atividade} from './atividade.class.js';
import {adicionarAtividade, buscarAtividades} from './firebase-db.js';
import {DATABASE} from './firebase.js';

const BTN_ADD_ATIVIDADE = document.querySelector('#adicionar-atividade');
const BTN_ADD_OPTION = document.querySelector('#adicionar-opcao');
const BTN_CONCLUIR = document.querySelector('#concluir');
const URL = document.querySelector('#url');
const TEMPO_INICIO = document.querySelector('#tempo-inicio');
const TEMPO_PAUSE = document.querySelector('#tempo-pause');
const PERGUNTA = document.querySelector('#pergunta');
const RESPOSTA = document.querySelector('#resposta');
const ALTERNATIVA = document.querySelector('#alternativa');

let atividade = null;

BTN_ADD_ATIVIDADE.addEventListener('click', function() {
    atividade = new Atividade(URL.value, TEMPO_INICIO.value, TEMPO_PAUSE.value, PERGUNTA.value, RESPOSTA.value);
});

BTN_ADD_OPTION.addEventListener('click', function() {
    atividade.addOption = ALTERNATIVA.value;
    ALTERNATIVA.value = '';
});

BTN_CONCLUIR.addEventListener('click', function() {
    URL.value = '';
    TEMPO_INICIO.value = '';
    TEMPO_PAUSE.value = '';
    PERGUNTA.value = '';
    RESPOSTA.value = '';
    adicionarAtividade(atividade);
    buscarAtividades();
});


const teste = DATABASE.ref('/atividades/');

teste.on('value', function(snapshot) {
    console.log(snapshot.val());
});

// carregar atividades

// document.addEventListener('DOMContentLoaded', function(e) {

//     TESTE.on('child_added', function(atv) {
//         console.log(atv.val());
//     });

// });
