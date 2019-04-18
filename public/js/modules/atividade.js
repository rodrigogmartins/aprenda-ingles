import {Atividade} from '../class/atividade.class.js';
import {onYouTubeIframeAPIReady} from '../modules/yt-iframe.js';

export const mostraAtividade = function(TODAS_ATIVIDADES, ATIVIDADE_ATUAL) {
    const MAP = new Map(Object.entries(TODAS_ATIVIDADES));
    const atividade = MAP.get(ATIVIDADE_ATUAL);
    const ATIVIDADE = new Atividade(atividade.codigo, atividade.tempoInicio,
        atividade.tempoPause, atividade.modulo, atividade.pergunta, atividade.resposta);
    const alternativas = atividade.alternativas;
    alternativas.push(atividade.resposta);
    ATIVIDADE.alternativas = alternativas;
    window.location.hash = ATIVIDADE.modulo;
    montaVideo(ATIVIDADE);
    mostraPergunta(ATIVIDADE.pergunta);
    montaOpcoesAtividade(ATIVIDADE);
};

const montaVideo = function(ATIVIDADE) {
    const TEMPO_INICIO = tempoEmSegundos(ATIVIDADE.tempoInicio);
    const TEMPO_FIM = tempoEmSegundos(ATIVIDADE.tempoPause);
    const CODIGO = ATIVIDADE.codigo;
    onYouTubeIframeAPIReady(CODIGO, TEMPO_INICIO, TEMPO_FIM);
};

const tempoEmSegundos = function(tempo) {
    const TEMPO = tempo.split(':').reverse();
    let segundos = parseInt(TEMPO[0]);
    if (TEMPO[1]) {
        segundos += (parseInt(TEMPO[1]) * 60);
    }
    if (TEMPO[2]) {
        segundos += (parseInt(TEMPO[2]) * 3600);
    }
    return segundos;
};

const mostraPergunta = function(pergunta) {
    const CAMPO_PERGUNTA = document.querySelector('#titulo');
    CAMPO_PERGUNTA.textContent = pergunta;
};

const montaOpcoesAtividade = function(ATIVIDADE) {
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
