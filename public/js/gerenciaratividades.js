import { Atividade } from './class/atividade.class.js';
import { montarTabelaDeAtividades } from './modules/table.js';
import { buscarTodasAtividades, excluirAtividade,
    buscaAtividade, editarAtividade }
    from './modules/crud/atividade.crud.js';

const T_BODY = document.querySelector('tbody');
const FORM = document.querySelector('#alterar');
const BTN_EDIT = document.querySelector('#editar');

document.addEventListener('DOMContentLoaded', function() {
    const HASH = window.location.hash.replace('#', '').split('&');
    const MODULO = HASH[0];

    buscarTodasAtividades(MODULO)
        .then(montarTabelaDeAtividades);
});

BTN_EDIT.addEventListener('click', function() {
    const ATIVIDADE = new Atividade(FORM.url.value.split('=')[1],
        FORM.tempoinicio.value, FORM.tempopause.value,
        FORM.pergunta.value, FORM.resposta.value);
    const ALTERNATIVAS = [FORM.alternativa0.value,
        FORM.alternativa1.value, FORM.alternativa2.value];
    ATIVIDADE.alternativas = ALTERNATIVAS;

    const HASH = window.location.hash.replace('#', '').split('&');
    const MODULO = HASH[0];
    const COD_ATVIDADE = HASH[1];

    editarAtividade(MODULO, COD_ATVIDADE, ATIVIDADE);
});

T_BODY.addEventListener('click', function(e) {
    const HASH = window.location.hash.replace('#', '');
    const MODULO = HASH.split('&')[0];
    const COD_ATVIDADE = e.target.parentElement.parentElement.dataset['key'];
    let NOVA_URL = window.location.href(HASH, '');
    NOVA_URL = NOVA_URL + `#${MODULO}&${COD_ATVIDADE}`;

    if (e.target.tagName === 'BUTTON' && e.target.id === 'btn-edit') {
        buscaAtividade(MODULO, COD_ATVIDADE)
            .then((ATIVIDADE) =>
                mostraAtividade(ATIVIDADE, NOVA_URL)
            );
    } else if (e.target.tagName === 'BUTTON' && e.target.id === 'btn-delete') {
        excluirAtividade(MODULO, COD_ATVIDADE)
            .then(() =>
                window.location.href = NOVA_URL
            );
    }
});

const mostraAtividade = function(atividade, nova_url) {
    FORM.url.value = `https://www.youtube.com/watch?v=${atividade.codigo}`,
    FORM.tempoinicio.value = atividade.tempoInicio;
    FORM.tempopause.value = atividade.tempoPause;
    FORM.pergunta.value = atividade.pergunta;
    FORM.resposta.value = atividade.resposta;
    const alternativas = atividade.alternativas;

    for (let i = 0; i < alternativas.length; i++) {
        document.querySelector(`#alternativa${i}`).value = alternativas[i];
    }

    window.location.href = nova_url;
};
