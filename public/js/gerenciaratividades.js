import {buscarTodasAtividades, excluirAtividade}
    from './modules/firebase-db.js';
import {logout} from './modules/firebase-auth.js';

const BTN_SAIR = document.querySelector('#sair');
const T_BODY = document.querySelector('tbody');

BTN_SAIR.addEventListener('click', logout);

document.addEventListener('DOMContentLoaded', function() {
    buscarTodasAtividades().then(montarTabelaDeAtividades);
});

T_BODY.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
        excluirAtividade(e.target.parentElement.parentElement.dataset['key']);
    }
});

const montarTabelaDeAtividades = function(OBJECT) {
    const MAP = new Map(Object.entries(OBJECT));
    const CHAVES = Object.keys(OBJECT);
    const TBODY = document.querySelector('#tbody');
    for (let i = 0; i < CHAVES.length; i++) {
        const ATIVIDADE = MAP.get(CHAVES[i]);
        const TH_COD = criarLinhaTabela(CHAVES[i]);
        const TH_PERGUNTA = criarLinhaTabela(ATIVIDADE.pergunta);
        const TH_DELETE = document.createElement('th');
        const BTN = document.createElement('button');
        BTN.textContent = 'X';
        BTN.setAttribute('class', 'btn btn-sm btn-block btn-danger');
        TH_DELETE.appendChild(BTN);
        const TR = document.createElement('tr');
        TR.appendChild(TH_COD);
        TR.appendChild(TH_PERGUNTA);
        TR.appendChild(TH_DELETE);
        TR.dataset['key'] = CHAVES[i];
        TBODY.appendChild(TR);
    }
};

const criarLinhaTabela = function(texto) {
    const TH = document.createElement('th');
    const SPAN = document.createElement('span');
    SPAN.setAttribute('class', 'alinhar d-inline-block text-truncate');
    SPAN.textContent = texto;
    TH.appendChild(SPAN);
    return TH;
};
