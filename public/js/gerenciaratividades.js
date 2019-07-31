import {Atividade} from './class/atividade.class.js';
import {montarTabelaDeAtividades} from './modules/table.js';
import {buscarTodasAtividades, excluirAtividade,
    buscaAtividade, editarAtividade}
    from './modules/crud/atividade.crud.js';

const T_BODY = document.querySelector('tbody');
const FORM = document.querySelector('#alterar');
const BTN_EDIT = document.querySelector('#editar');
const MENU_ATV = document.querySelector('#menu-atv');
const MENU_ADD_ATV = document.querySelector('#menu-add-atv');

document.addEventListener('DOMContentLoaded', function() {
    const MODULO = window.location.search.replace('?', '');

    MENU_ATV.setAttribute('href', `./../atividade.html${MODULO}`);
    MENU_ADD_ATV.setAttribute('href', `./../adicionaratividade.html${MODULO}`);

    buscarTodasAtividades(MODULO)
        .then(montarTabelaDeAtividades);
});

BTN_EDIT.addEventListener('click', function(e) {
    const ATIVIDADE = new Atividade(FORM.url.value.split('=')[1],
        FORM.tempoinicio.value, FORM.tempopause.value,
        FORM.pergunta.value, FORM.resposta.value);
    const ALTERNATIVAS = [FORM.alternativa0.value,
        FORM.alternativa1.value, FORM.alternativa2.value];
    ATIVIDADE.alternativas = ALTERNATIVAS;

    const MODULO = window.location.search.replace('?', '');
    const COD_ATVIDADE = e.target.parentElement.parentElement.dataset['key'];

    editarAtividade(MODULO, COD_ATVIDADE, ATIVIDADE);
});

T_BODY.addEventListener('click', function(e) {
    const MODULO = window.location.search.replace('?', '');
    const COD_ATVIDADE = e.target.parentElement.parentElement.dataset['key'];

    if (e.target.tagName === 'BUTTON' && e.target.id === 'btn-edit') {
        buscaAtividade(MODULO, COD_ATVIDADE)
            .then((ATIVIDADE) =>
                mostraAtividade(ATIVIDADE)
            );
    } else if (e.target.tagName === 'BUTTON' && e.target.id === 'btn-delete') {
        excluirAtividade(MODULO, COD_ATVIDADE)
            .then(() =>
                window.location.reload()
            );
    }
});

const mostraAtividade = function(atividade, novaUrl) {
    FORM.url.value = `https://www.youtube.com/watch?v=${atividade.codigo}`,
    FORM.tempoinicio.value = atividade.tempoInicio;
    FORM.tempopause.value = atividade.tempoPause;
    FORM.pergunta.value = atividade.pergunta;
    FORM.resposta.value = atividade.resposta;
    const alternativas = atividade.alternativas;

    for (let i = 0; i < alternativas.length; i++) {
        document.querySelector(`#alternativa${i}`).value = alternativas[i];
    }
};
