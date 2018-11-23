import {Atividade} from './class/atividade.class.js';
import {adicionarAtividade} from './modules/firebase-db';
import {logout} from './modules/firebase-auth.js';

const FORM = document.querySelector('#add-atividade');
const BTN_SAIR = document.querySelector('#sair');
let atividade = null;
let numeroDeAlternativasAdicionadas = 0;

BTN_SAIR.addEventListener('click', logout);

FORM.adicionaratividade.addEventListener('click', function(e) {
    atividade = new Atividade(FORM.url.value, FORM.tempoinicio.value,
        FORM.tempopause.value, FORM.pergunta.value, FORM.resposta.value);
    FORM.adicionaratividade.setAttribute('disabled', true);
    e.preventDefault();
});

FORM.adicionaropcao.addEventListener('click', function(e) {
    numeroDeAlternativasAdicionadas++;
    if (numeroDeAlternativasAdicionadas === 3) {
        FORM.adicionaropcao.setAttribute('disabled', true);
    }
    atividade.addOption = FORM.alternativa.value;
    FORM.alternativa.removeAttribute('placeholder');
    FORM.alternativa.setAttribute('placeholder',
        `Alternativa ${numeroDeAlternativasAdicionadas} de 3`);
    adicionarElementosTabela(FORM.alternativa.value,
        numeroDeAlternativasAdicionadas);
    FORM.alternativa.value = '';
    FORM.alternativa.focus();
    e.preventDefault();
});

const adicionarElementosTabela = function(numeroRow, valor) {
    const TBODY = document.querySelector('#tbody');
    const TH = document.createElement('th');
    TH.setAttribute('scope', 'row');
    TH.textContent = numeroRow;
    const TD = document.createElement('td');
    TD.textContent = valor;
    const TR = document.createElement('tr');
    TR.appendChild(TD);
    TR.appendChild(TH);
    TBODY.appendChild(TR);
};

FORM.concluir.addEventListener('click', function(e) {
    adicionarAtividade(atividade);
    limparFormulario();
    e.preventDefault();
});

const limparFormulario = function() {
    const TBODY = document.querySelector('#tbody');
    numeroDeAlternativasAdicionadas = 0;
    TBODY.innerHTML = '';
    FORM.url.value = '';
    FORM.tempoinicio.value = '';
    FORM.tempopause.value = '';
    FORM.pergunta.value = '';
    FORM.resposta.value = '';
    FORM.alternativa.removeAttribute('placeholder');
    FORM.adicionaropcao.removeAttribute('disabled');
    FORM.adicionaratividade.removeAttribute('disabled');
    FORM.alternativa.setAttribute('placeholder', `Alternativa 0 de 3`);
    atividade = '';
};