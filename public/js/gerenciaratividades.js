import {logout} from './modules/firebase-auth.js';
import {Atividade} from './class/atividade.class.js';
import {montarTabelaDeAtividades} from './modules/table.js';
import {buscarTodasAtividades, excluirAtividade,
    buscaAtividade, editarAtividade}
    from './modules/crud/atividade.crud.js';

const BTN_SAIR = document.querySelector('#sair');
const T_BODY = document.querySelector('tbody');
const FORM = document.querySelector('#alterar');
const BTN_EDIT = document.querySelector('#editar');

BTN_SAIR.addEventListener('click', logout);

document.addEventListener('DOMContentLoaded', function() {
    buscarTodasAtividades().then(montarTabelaDeAtividades)
        .catch(function(err) {
            console.log(err);
        });
});


BTN_EDIT.addEventListener('click', function() {
    const ATIVIDADE = new Atividade(FORM.url.value.split('=')[1],
        FORM.tempoinicio.value, FORM.tempopause.value,
        FORM.pergunta.value, FORM.resposta.value);
    const ALTERNATIVAS = [FORM.alternativa0.value,
        FORM.alternativa1.value, FORM.alternativa2.value];
    ATIVIDADE.alternativas = ALTERNATIVAS;
    const id = localStorage.getItem('id');
    editarAtividade(id, ATIVIDADE);
});

T_BODY.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' && e.target.id === 'btn-edit') {
        const codAtiv = e.target.parentElement.parentElement.dataset['key'];
        localStorage.setItem('id', codAtiv);
        buscaAtividade(codAtiv)
            .then(montaAtividade)
            .then(mostraAtividade);
    } else if (e.target.tagName === 'BUTTON' && e.target.id === 'btn-delete') {
        excluirAtividade(e.target.parentElement.parentElement.dataset['key'])
            .then(atualizaTabela);
    }
});

const montaAtividade = function(ATIVIDADE) {
    const atividade = new Atividade(ATIVIDADE.codigo, ATIVIDADE.tempoInicio,
        ATIVIDADE.tempoPause, ATIVIDADE.pergunta, ATIVIDADE.resposta);
    atividade.alternativas = ATIVIDADE.alternativas;
    return atividade;
};

const mostraAtividade = function(atividade) {
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

const atualizaTabela = function() {
    const TBODY = document.querySelector('#tbody');
    TBODY.innerHTML = '';
    buscarTodasAtividades();
}
