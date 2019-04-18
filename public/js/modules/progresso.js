import {getIdUsuario} from './firebase-auth.js';
import {getProgressoUsuario, buscarTodasAtividades} from './crud/atividade.crud.js';

export const mostraBarraDeProgresso = function() {
    buscarTodasAtividades()
        .then(function(OBJECT) {
            const TOTAL_ATIVIDADES = Object.keys(OBJECT).length;
            getIdUsuario()
                .then(getProgressoUsuario)
                .then(function(progresso) {
                    atualizaBarraDeProgresso(progresso, TOTAL_ATIVIDADES);
                });
        });
};

const atualizaBarraDeProgresso = function(progresso, totalAtividades) {
    const PROGRESS_BAR = document.querySelector('.progress-bar');
    const PROGRESSO = progresso.atividades.split(';').length;
    const progressoPorcentagem =
        Math.round(((PROGRESSO - 1) * 100) / totalAtividades);
    PROGRESS_BAR.setAttribute('style', `width: ${progressoPorcentagem}%`);
    PROGRESS_BAR.textContent = `${progressoPorcentagem}%`;
};

export const mostraAtividadeAtual = function(mostraAtividade, modulo) {
    buscarTodasAtividades()
        .then(function(TODAS_ATIVIDADES) {
            const CHAVES = Object.keys(TODAS_ATIVIDADES);
            getIdUsuario()
                .then(getProgressoUsuario)
                .then(function(progresso) {
                    console.log(progresso[modulo]);
                    const ARRAY_ATIVIDADES = progresso.atividades.split(';');
                    const INDICE_ATIVIDADE_ATUAL =
                        ARRAY_ATIVIDADES.reverse()[0];
                    const ATIVIDADE_ATUAL = CHAVES[INDICE_ATIVIDADE_ATUAL];
                    mostraAtividade(TODAS_ATIVIDADES, ATIVIDADE_ATUAL);
                });
        });
};
