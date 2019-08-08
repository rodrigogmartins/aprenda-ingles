import {onYouTubeIframeAPIReady} from '../modules/yt-iframe.js';

export const mostraAtividade = function(ATIVIDADE) {
    if (ATIVIDADE.tipo === 'video') {
        const DIV_PLAYER = document.querySelector('#player');
        DIV_PLAYER.style.height = '50vh';
        montaVideo(ATIVIDADE);
        mostraTextoAtividade(ATIVIDADE.pergunta);
        montaOpcoesAtividade(ATIVIDADE);
    } else if (ATIVIDADE.tipo === 'traducao-parcial') {
        const DIV_PLAYER = document.querySelector('#player');
        DIV_PLAYER.style.height = 'auto';
        DIV_PLAYER.style.backgroundColor = 'rgba(0, 0, 0, .3)';
        DIV_PLAYER.style.marginBottom = '2em';
        DIV_PLAYER.style.paddingBottom = '1em';
        DIV_PLAYER.style.paddingTop = '1em';
        mostraTextoAtividade(ATIVIDADE.texto);
        montaOpcoesAtividade(ATIVIDADE);
    } else if (ATIVIDADE.tipo === 'traducao') {
        const DIV_PLAYER = document.querySelector('#player');
        DIV_PLAYER.style.height = 'auto';
        const DIV_BOTOES = document.querySelector('#botoes');
        const DIV = montaDivTraducao();
        DIV_BOTOES.appendChild(DIV);
        mostraTextoAtividade(ATIVIDADE.texto);
    }
};

const montaDivTraducao = function() {
    const DIV = document.createElement('div');
    DIV.setAttribute('class', 'col-12 col-lg-12 col-xl-12');
    const TEXTAREA = document.createElement('textarea');
    TEXTAREA.setAttribute('class', 'col-12 col-lg-12 col-xl-12');
    TEXTAREA.setAttribute('name', 'textarea');
    TEXTAREA.setAttribute('placeholder', 'Traduza o texto a cima');
    TEXTAREA.setAttribute('id', 'resposta');
    const BUTTON = document.createElement('button');
    BUTTON.setAttribute('class', 'btn btn-lg opcao btn-block btn-primary');
    BUTTON.setAttribute('name', 'submit');
    BUTTON.textContent = 'Verificar';

    DIV.appendChild(TEXTAREA);
    DIV.appendChild(BUTTON);
    return DIV;
}

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

const mostraTextoAtividade = function(texto) {
    const CAMPO_TEXTO = document.querySelector('#titulo');

    CAMPO_TEXTO.textContent = texto;
};

const montaOpcoesAtividade = function(ATIVIDADE) {
    const OPCOES = ATIVIDADE.alternativas;

    mostrarAlternativas(OPCOES);
};

const mostrarAlternativas = function(alternativas) {
    const BUTTONS = document.querySelector('#botoes');
    const opcoesSorteadas = [];
    while (opcoesSorteadas.length < alternativas.length) {
        let sorteioOpcao = Math.round(Math.random() * (alternativas.length - 1));

        if (elementoNaoSorteado(opcoesSorteadas, sorteioOpcao)) {
            const BUTTON = document.createElement('button');
            BUTTON.setAttribute('class', 'btn btn-lg btn-block btn-primary opcao col-12 col-lg-4 col-xl-4"');
            BUTTON.textContent = alternativas[sorteioOpcao];
            BUTTONS.appendChild(BUTTON);

            opcoesSorteadas.push(sorteioOpcao);
        } else {
            sorteioOpcao = Math.round(Math.random() * alternativas.length - 1);
        }
    }
};

const elementoNaoSorteado = function(vetor, elemento) {
    return vetor.indexOf(elemento) === -1;
};
