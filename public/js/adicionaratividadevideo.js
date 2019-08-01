import {AtividadeVideo} from './class/atividadevideo.class.js';
import {adicionarAtividadeVideo} from './modules/crud/atividade.crud.js';

const FORM_VIDEO = document.querySelector('#add-atividade-video');
const MAX_ALTERNATIVAS = 3;
let atividade = null;
let numeroDeAlternativasAdicionadas = 0;

FORM_VIDEO.adicionaratividade.addEventListener('click', function(e) {
    atividade = new AtividadeVideo(FORM_VIDEO.url.value.split('=')[1],
        FORM_VIDEO.tempoinicio.value, FORM_VIDEO.tempopause.value,
        FORM_VIDEO.pergunta.value, FORM_VIDEO.resposta.value, 'video');
    FORM_VIDEO.adicionaratividade.setAttribute('disabled', true);
    e.preventDefault();
});

FORM_VIDEO.adicionaropcao.addEventListener('click', function(e) {
    numeroDeAlternativasAdicionadas++;

    if (numeroDeAlternativasAdicionadas === MAX_ALTERNATIVAS) {
        FORM_VIDEO.adicionaropcao.setAttribute('disabled', true);
    }
    atividade.addOption = FORM_VIDEO.alternativa.value;
    FORM_VIDEO.alternativa.removeAttribute('placeholder');
    FORM_VIDEO.alternativa.setAttribute('placeholder',
        `Alternativa ${numeroDeAlternativasAdicionadas} de 3`);

    adicionarElementosTabela(numeroDeAlternativasAdicionadas,
            FORM_VIDEO.alternativa.value);
    FORM_VIDEO.alternativa.value = '';
    FORM_VIDEO.alternativa.focus();
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

FORM_VIDEO.concluir.addEventListener('click', function(e) {
    const MODULO = window.location.search.replace('?', '');

    adicionarAtividadeVideo(MODULO, atividade);
    limparFormulario();
    e.preventDefault();
});

const limparFormulario = function() {
    const TBODY = document.querySelector('#tbody');
    numeroDeAlternativasAdicionadas = 0;
    TBODY.innerHTML = '';
    FORM_VIDEO.url.value = '';
    FORM_VIDEO.tempoinicio.value = '';
    FORM_VIDEO.tempopause.value = '';
    FORM_VIDEO.pergunta.value = '';
    FORM_VIDEO.resposta.value = '';
    FORM_VIDEO.alternativa.removeAttribute('placeholder');
    FORM_VIDEO.adicionaropcao.removeAttribute('disabled');
    FORM_VIDEO.adicionaratividade.removeAttribute('disabled');
    FORM_VIDEO.alternativa.setAttribute('placeholder', `Alternativa 0 de 3`);
    atividade = '';
};
