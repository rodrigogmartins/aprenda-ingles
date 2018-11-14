import {Atividade} from './atividade.class.js';

const BTN_ADD_ATIVIDADE = document.querySelector('#adicionar-atividade');
const BTN_ADD_OPTION = document.querySelector('#adicionar-opcao');

let atividade = null;

BTN_ADD_ATIVIDADE.addEventListener('click', function() {
    const URL = document.querySelector('#url').value;
    const TEMPO_INICIO = document.querySelector('#tempo-inicio').value;
    const TEMPO_PAUSE = document.querySelector('#tempo-pause').value;
    const PERGUNTA = document.querySelector('#pergunta').value;
    const RESPOSTA = document.querySelector('#resposta').value;

    atividade = new Atividade(URL, TEMPO_INICIO, TEMPO_PAUSE, PERGUNTA, RESPOSTA);
    console.log(atividade);
});

BTN_ADD_OPTION.addEventListener('click', function() {
    const ALTERNATIVA = document.querySelector('#alternativa');

    atividade.addOption = ALTERNATIVA;
    console.log('teste \n\n')
    console.log(atividade);
});
