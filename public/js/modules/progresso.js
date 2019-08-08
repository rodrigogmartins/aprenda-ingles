import {buscarTodasAtividades,
    getProgressoModuloUsuario,
    setAtividadeInicial} from './crud/atividade.crud.js';
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
                    } else {
                        setAtividadeInicial(userId, MODULO);
                    }

                    buscarTodasAtividades(MODULO)
                        .then(function(TODAS_ATIVIDADES) {
                            const TOTAL_ATIVIDADES =
                                Object.keys(TODAS_ATIVIDADES).length - 3;

                            localStorage.setItem('todasAtividades',
                                JSON.stringify(TODAS_ATIVIDADES));
                            localStorage.setItem('indiceAtual',
                                INDICE_ATV_ATUAL);

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
    const TODAS_ATIVIDADES =
        JSON.parse(localStorage.getItem('todasAtividades'));
    const INDICE_ATV_ATUAL = localStorage.getItem('indiceAtual');
    const CHAVES = Object.keys(TODAS_ATIVIDADES);
    const MAP =
        new Map(Object.entries(TODAS_ATIVIDADES));
    const ATIVIDADE_ATUAL = CHAVES[INDICE_ATV_ATUAL];
    const atividade = MAP.get(ATIVIDADE_ATUAL);
    const ATIVIDADE = montarObjetoAtividade(atividade);

    return new Promise(function(resolve) {
        resolve(ATIVIDADE);
    });
};

const montarObjetoAtividade = function(atividade) {
    const ATIVIDADE = atividade;

    if (atividade.tipo === 'video') {
        const alternativas = atividade.alternativas;
        alternativas.push(atividade.resposta);
        ATIVIDADE.alternativas = alternativas;
    }

    return ATIVIDADE;
};
