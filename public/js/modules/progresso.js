import {Atividade} from '../class/atividade.class.js';
import {buscarTodasAtividades,
    getProgressoModuloUsuario} from './crud/atividade.crud.js';
import {getIdUsuario} from './firebase-auth.js';

export const mostraBarraDeProgresso = function() {
    const MODULO = window.location.search.replace('?', '');
    getIdUsuario()
        .then(function(userId) {
            getProgressoModuloUsuario(userId, MODULO)
                .then(function(progresso) {
                    let INDICE_ATV_ATUAL = 0;

                    if (progresso) {
                        INDICE_ATV_ATUAL = progresso.split(';').reverse()[1];
                    }

                    buscarTodasAtividades(MODULO)
                        .then(function(TODAS_ATIVIDADES) {
                            const TOTAL_ATIVIDADES =
                                Object.keys(TODAS_ATIVIDADES).length - 3;

                            atualizaBarraDeProgresso(INDICE_ATV_ATUAL,
                                TOTAL_ATIVIDADES);
                        });
                });
        });
};

const atualizaBarraDeProgresso = function(progresso, totalAtividades) {
    const progressoPorcentagem =
        Math.round((progresso * 100) / totalAtividades);
    const PROGRESS_BAR = document.querySelector('.progress-bar');

    PROGRESS_BAR.setAttribute('style', `width: ${progressoPorcentagem}%`);
    PROGRESS_BAR.textContent = `${progressoPorcentagem}%`;
};

export const getAtividadeAtual = function() {
    const MODULO = window.location.search.replace('?', '');

    return getIdUsuario()
        .then(function(userId) {
            getProgressoModuloUsuario(userId, MODULO)
                .then(function(progresso) {
                    let INDICE_ATV_ATUAL = 0;

                    if (progresso) {
                        INDICE_ATV_ATUAL = progresso.split(';').reverse()[1];
                    }

                    buscarTodasAtividades(MODULO)
                        .then(function(TODAS_ATIVIDADES) {
                            const CHAVES = Object.keys(TODAS_ATIVIDADES);
                            const MAP =
                                new Map(Object.entries(TODAS_ATIVIDADES));
                            const ATIVIDADE_ATUAL = CHAVES[INDICE_ATV_ATUAL];
                            const atividade = MAP.get(ATIVIDADE_ATUAL);
                            const ATIVIDADE = montarObjetoAtividade(atividade);

                            return new Promise(function(resolve) {
                                resolve(ATIVIDADE);
                            });
                        });
                });
        });
};

const montarObjetoAtividade = function(atividade) {
    const ATIVIDADE = new Atividade(atividade.codigo, atividade.tempoInicio,
        atividade.tempoPause, atividade.modulo,
        atividade.pergunta, atividade.resposta);
    const alternativas = atividade.alternativas;

    alternativas.push(atividade.resposta);
    ATIVIDADE.alternativas = alternativas;

    return ATIVIDADE;
};
