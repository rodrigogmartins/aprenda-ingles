import { AtividadeVideo } from './class/atividadevideo.class.js';
import {montarTabelaDeAtividades} from './modules/table.js';
import {buscarTodasAtividades, excluirAtividade,
    buscaAtividade, editarAtividadeVideo, editarAtividadeTraducaoParcial}
    from './modules/crud/atividade.crud.js';
import { AtividadeTraducaoParcial } from './class/atividadetradparc.class.js';

const T_BODY = document.querySelector('tbody');
const FORM_ATV_VIDEO = document.querySelector('#ger-atividade-video');
const FORM_ATV_TRAD_PARC = document.querySelector('#ger-atividade-trad-parc')
const BTN_EDIT_VIDEO = document.querySelector('#editar-atividade-video');
const BTN_EDIT_TRAD_PARC = document.querySelector('#editar-atividade-trad-parc');
const MENU_ATV = document.querySelector('#menu-atv');
const MENU_ADD_ATV = document.querySelector('#menu-add-atv');

document.addEventListener('DOMContentLoaded', function() {
    const MODULO = window.location.search.replace('?', '');

    MENU_ATV.setAttribute('href', `./../atividade.html${MODULO}`);
    MENU_ADD_ATV.setAttribute('href', `./../adicionaratividade.html${MODULO}`);

    buscarTodasAtividades(MODULO)
        .then(montarTabelaDeAtividades);
});

BTN_EDIT_VIDEO.addEventListener('click', function(e) {
    const MODULO = window.location.search.replace('?', '');
    const COD_ATVIDADE = e.target.parentElement.parentElement.dataset['key'];
    const URL = FORM_ATV_VIDEO.url.value.split('=')[1].trim();
    const TEMPO_INICIO = FORM_ATV_VIDEO.tempoinicio.value.trim();
    const TEMPO_PAUSE = FORM_ATV_VIDEO.tempopause.value.trim();
    const PERGUNTA = FORM_ATV_VIDEO.pergunta.value.trim();
    const RESPOSTA = FORM_ATV_VIDEO.resposta.value.trim();
    const ALTERNATIVAS = [FORM_ATV_VIDEO.alternativa0.value.trim(),
        FORM_ATV_VIDEO.alternativa1.value.trim(), FORM_ATV_VIDEO.alternativa2.value.trim()];
    const ATIVIDADE = new AtividadeVideo(URL, TEMPO_INICIO, TEMPO_PAUSE, PERGUNTA, RESPOSTA, 'video');
    ATIVIDADE.alternativas = ALTERNATIVAS;

    editarAtividadeVideo(MODULO, COD_ATVIDADE, ATIVIDADE);
});

BTN_EDIT_TRAD_PARC.addEventListener('click', function(e) {
    const MODULO = window.location.search.replace('?', '');
    const COD_ATVIDADE = e.target.dataset['key'];
    const TEXTO = FORM_ATV_TRAD_PARC.texto.value.trim();
    const RESPOSTA = FORM_ATV_TRAD_PARC.traducao.value.trim();
    const ATIVIDADE = new AtividadeTraducaoParcial(TEXTO, RESPOSTA, 'traducao-parcial');
    const ALTERNATIVAS = [];

    for (let i = 0; i < 8; i++) {
        const alternativa = document.querySelector(`#alternativa-trad-parc${i}`).value.trim();

        if (alternativa) {
            ALTERNATIVAS.push(alternativa);
        }
    }
    ATIVIDADE.alternativas = ALTERNATIVAS;

    editarAtividadeTraducaoParcial(MODULO, COD_ATVIDADE, ATIVIDADE);
})

T_BODY.addEventListener('click', function(e) {
    const MODULO = window.location.search.replace('?', '');
    const COD_ATVIDADE = e.target.parentElement.parentElement.dataset['key'];

    if (e.target.tagName === 'BUTTON' && e.target.id === 'btn-edit') {
        buscaAtividade(MODULO, COD_ATVIDADE)
            .then(function(atividade) {
                mostraAtividade(atividade, COD_ATVIDADE);
            });
    } else if (e.target.tagName === 'BUTTON' && e.target.id === 'btn-delete') {
        excluirAtividade(MODULO, COD_ATVIDADE)
            .then(() =>
                window.location.reload()
            );
    }
});

const mostraAtividade = function(atividade, COD_ATVIDADE) {
    if (atividade.tipo === 'video') {
        FORM_ATV_VIDEO.url.value = `https://www.youtube.com/watch?v=${atividade.codigo}`,
        FORM_ATV_VIDEO.tempoinicio.value = atividade.tempoInicio;
        FORM_ATV_VIDEO.tempopause.value = atividade.tempoPause;
        FORM_ATV_VIDEO.pergunta.value = atividade.pergunta;
        FORM_ATV_VIDEO.resposta.value = atividade.resposta;
        const alternativas = atividade.alternativas;

        for (let i = 0; i < alternativas.length; i++) {
            document.querySelector(`#alternativa-video${i}`).value = alternativas[i];
        }

        BTN_EDIT_VIDEO.dataset['key'] = COD_ATVIDADE;
    } else if (atividade.tipo === 'traducao-parcial') {
        FORM_ATV_TRAD_PARC.texto.value = atividade.texto;
        FORM_ATV_TRAD_PARC.traducao.value = atividade.resposta
        const alternativas = atividade.alternativas;

        for (let i = 0; i < alternativas.length; i++) {
            const alternativa = alternativas[i];

            if (alternativa) {
                document.querySelector(`#alternativa-trad-parc${i}`).value = alternativa;
            }
        }

        BTN_EDIT_TRAD_PARC.dataset['key'] = COD_ATVIDADE;
    }
};
