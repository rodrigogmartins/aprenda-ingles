import {Atividade} from '../class/atividade.class.js';

export const mostraAtividade = function(OBJECT) {
    console.log('entrou');
    const MAP = new Map(Object.entries(OBJECT));
    const ATIVIDADE_ATUAL = localStorage.getItem('atividadeAtual');
    console.log(ATIVIDADE_ATUAL);
    const atividade = MAP.get(ATIVIDADE_ATUAL);
    const ATIVIDADE = new Atividade(atividade.url, atividade.tempoInicio,
        atividade.tempoPause, atividade.pergunta, atividade.resposta);
    const alternativas = atividade.alternativas;
    alternativas.push(atividade.resposta);
    ATIVIDADE.alternativas = alternativas;
    console.log(alternativas);
    salvaResposta(ATIVIDADE);
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

export const salvaResposta = function(objectAtividade) {
    localStorage.setItem('resposta', objectAtividade.resposta);
};

export const salvaUserId = function(userId) {
    localStorage.setItem('userid', userId);
};
