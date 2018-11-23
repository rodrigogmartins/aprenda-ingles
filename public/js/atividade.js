import {logout, getIdUsuario} from './modules/firebase-auth.js';
import {buscaAtividade, getProgressoUsuario} from './modules/firebase-db.js';
import {Atividade} from './class/atividade.class.js';

const BTN_SAIR = document.querySelector('#sair');

BTN_SAIR.addEventListener('click', logout);

document.addEventListener('DOMContentLoaded', function() {
    getIdUsuario().then(getProgressoUsuario).then(salvaProgresso);
    buscaAtividade(localStorage.getItem('progresso')).then(mostraAtividade);
});

const salvaProgresso = function(progresso) {
    localStorage.setItem('progresso', progresso.codigovideo);
};

const mostraAtividade = function(atividade) {
    const ATIVIDADE = new Atividade(atividade.url, atividade.tempoInicio,
        atividade.tempoPause, atividade.pergunta, atividade.resposta);
    const atividades = atividade.alternativas;
    atividades.push(atividade.resposta);
    ATIVIDADE.alternativas = atividades;
    montaVideoAtividade(ATIVIDADE);
};

const montaVideoAtividade = function(ATIVIDADE) {
    // const IFRAME = document.querySelector('iframe');
    // IFRAME.setAttribute('src', `${ATIVIDADE.url}?controls=0&loop=1`);
    const OPCOES = ATIVIDADE.alternativas;
    mostrarAlternativas(OPCOES);
};

const mostrarAlternativas = function(alternativas) {
    const BUTTONS_OPCOES = document.querySelectorAll('.opcao');
    const botoesSorteados = [];
    const opcoesSorteadas = [];

    while (botoesSorteados.length < 4 && opcoesSorteadas.length < 4) {
        let sorteioBotao = Math.round(Math.random() * 3);
        let sorteioOpcao = Math.round(Math.random() * 3);

        if (elementoNaoSorteado(botoesSorteados, sorteioBotao)) {
            if (elementoNaoSorteado(opcoesSorteadas, sorteioOpcao)) {
                BUTTONS_OPCOES[sorteioBotao].textContent =
                    alternativas[sorteioOpcao];
                botoesSorteados.push(sorteioBotao);
                opcoesSorteadas.push(sorteioOpcao);
            } else {
                sorteioOpcao = Math.round(Math.random() * 3);
            }
        } else {
            sorteioBotao = Math.round(Math.random() * 3);
        }
    }
};

const elementoNaoSorteado = function(vetor, elemento) {
    return vetor.indexOf(elemento) === -1;
};

const BUTTONS = document.querySelectorAll('.opcao');
for (const BUTTON of BUTTONS) {
    BUTTON.addEventListener('click', function(event) {
        verificaAcerto(event);
    });
}

const verificaAcerto = function(event) {
    buscaAtividade(localStorage.getItem('progresso')).then(salvaResposta);
    const OPCAO = event.target.textContent;
    const RESPOSTA = localStorage.getItem('resposta');
    if (OPCAO === RESPOSTA) {
        console.log('acertou');
    } else {
        console.log('errou');
    }
};

const salvaResposta = function(objectAtividade) {
    localStorage.setItem('resposta', objectAtividade.resposta);
};