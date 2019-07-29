import { Atividade } from '../class/atividade.class.js';
import { buscarTodasAtividades } from './crud/atividade.crud.js';

export const mostraBarraDeProgresso = function() {
    const HASH = window.location.hash.replace('#', '').split('&');
    const MODULO = HASH[0];
    const ULTIMA_ATIVIDADE = HASH[1];

    buscarTodasAtividades(MODULO)
        .then(function(TODAS_ATIVIDADES) {
            const TOTAL_ATIVIDADES = Object.keys(TODAS_ATIVIDADES).length - 3;

            atualizaBarraDeProgresso(ULTIMA_ATIVIDADE, TOTAL_ATIVIDADES);
        });
};

const atualizaBarraDeProgresso = function(progresso, totalAtividades) {
    const progressoPorcentagem = Math.round((progresso * 100) / totalAtividades);
    const PROGRESS_BAR = document.querySelector('.progress-bar');

    PROGRESS_BAR.setAttribute('style', `width: ${progressoPorcentagem}%`);
    PROGRESS_BAR.textContent = `${progressoPorcentagem}%`;
};

export const getAtividadeAtual = function() {
    const HASH = window.location.hash.replace('#', '').split('&');
    const INDICE_ATIVIDADE_ATUAL = HASH[1];
    const MODULO = HASH[0];
    let ATIVIDADE;

    return buscarTodasAtividades(MODULO)
        .then(function(TODAS_ATIVIDADES) {
            const CHAVES = Object.keys(TODAS_ATIVIDADES);
            const MAP = new Map(Object.entries(TODAS_ATIVIDADES));
            const ATIVIDADE_ATUAL = CHAVES[INDICE_ATIVIDADE_ATUAL];
            const atividade = MAP.get(ATIVIDADE_ATUAL);
            ATIVIDADE = montarObjetoAtividade(atividade);

            return new Promise(function(resolve) {
                resolve(ATIVIDADE);
            });
        });
};

const montarObjetoAtividade = function(atividade) {
    const ATIVIDADE = new Atividade(atividade.codigo, atividade.tempoInicio,
        atividade.tempoPause, atividade.modulo, atividade.pergunta, atividade.resposta);
    const alternativas = atividade.alternativas;

    alternativas.push(atividade.resposta);
    ATIVIDADE.alternativas = alternativas;

    return ATIVIDADE;
};
