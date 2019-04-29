import {getIdUsuario} from './firebase-auth.js';
import {Atividade} from '../class/atividade.class.js';
import {getProgressoUsuario, buscarTodasAtividades} from './crud/atividade.crud.js';

export const mostraBarraDeProgresso = function() {
    const HASH = window.location.hash.replace('#', '').split('&');
    const MODULO = HASH[0];

    buscarTodasAtividades(MODULO)
        .then(function(TODAS_ATIVIDADES) {
            const TOTAL_ATIVIDADES = Object.keys(TODAS_ATIVIDADES).length;
            atualizaBarraDeProgresso();
            getIdUsuario()
                .then(getProgressoUsuario)
                .then(function(progresso) {
                    const PROGRESSO = buscarProgressoModulo(progresso, MODULO);

                    atualizaBarraDeProgresso(PROGRESSO, TOTAL_ATIVIDADES);
                });
        });
};

const buscarProgressoModulo = function(progresso, modulo) {
    const objString = JSON.stringify(progresso);
    const ARRAY = objString.split(',');

    for (let chave  of ARRAY) {
        chave = chave.replace(new RegExp('\"', 'g'), '');
        chave = chave.replace('{', '').split(':');

        if (chave[0] === modulo) {
            return chave[1].replace('}', '');
        }
    }      
}

const atualizaBarraDeProgresso = function(progresso, totalAtividades) {
    const PROGRESS_BAR = document.querySelector('.progress-bar');
    const PROGRESSO = progresso.atividades.split(';').length;
    const progressoPorcentagem =
        Math.round(((PROGRESSO - 1) * 100) / totalAtividades);

    PROGRESS_BAR.setAttribute('style', `width: ${progressoPorcentagem}%`);
    PROGRESS_BAR.textContent = `${progressoPorcentagem}%`;
};

export const getAtividadeAtual = function() {
    const HASH = window.location.hash.replace('#', '').split('&');
    const INDICE_ATIVIDADE_ATUAL = HASH[1];
    const MODULO = HASH[0];

    buscarTodasAtividades(MODULO)
        .then(function(TODAS_ATIVIDADES) {
            const CHAVES = Object.keys(TODAS_ATIVIDADES);    
            const MAP = new Map(Object.entries(TODAS_ATIVIDADES));
            const ATIVIDADE_ATUAL = CHAVES[INDICE_ATIVIDADE_ATUAL];
            const atividade = MAP.get(ATIVIDADE_ATUAL);
            const ATIVIDADE = montarObjetoAtividade(atividade);

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
