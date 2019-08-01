import {adicionarAtividade, adicionarAtividadeTraducaoParcial} from './modules/crud/atividade.crud.js';
import { AtividadeTraducaoParcial } from './class/atividadetradparc.class.js';

const FORM_TRAD_PARC = document.querySelector('#add-atividade-trad-parc');
const MODULO = window.location.search.replace('?', '');
const MAX_PALAVRAS = 8;
let atividade = null;
let numeroDeAlternativasAdicionadas = 0;

FORM_TRAD_PARC.adicionaratividade.addEventListener('click', function(e) {
    atividade = new AtividadeTraducaoParcial(FORM_TRAD_PARC.texto.value,
        FORM_TRAD_PARC.traducao.value, 'traducao-parcial');
    FORM_TRAD_PARC.adicionaratividade.setAttribute('disabled', true);
    e.preventDefault();
});

FORM_TRAD_PARC.adicionaropcao.addEventListener('click', function(e) {
    numeroDeAlternativasAdicionadas++;

    if (numeroDeAlternativasAdicionadas === MAX_PALAVRAS) {
        FORM_TRAD_PARC.adicionaropcao.setAttribute('disabled', true);
    }

    atividade.addOption = FORM_TRAD_PARC.alternativa.value;
    FORM_TRAD_PARC.alternativa.removeAttribute('placeholder');
    FORM_TRAD_PARC.alternativa.setAttribute('placeholder',
        `Alternativa ${numeroDeAlternativasAdicionadas} de ${MAX_PALAVRAS}`);

    adicionarElementosTabela(FORM_TRAD_PARC.alternativa.value,
        numeroDeAlternativasAdicionadas);

    FORM_TRAD_PARC.alternativa.value = '';
    FORM_TRAD_PARC.alternativa.focus();
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

FORM_TRAD_PARC.concluir.addEventListener('click', function(e) {
    window.location.search = MODULO;
    adicionarAtividadeTraducaoParcial(MODULO, atividade);
    limparFormulario();

    e.preventDefault();
});

const limparFormulario = function() {
    const TBODY = document.querySelector('#tbody');
    numeroDeAlternativasAdicionadas = 0;
    TBODY.innerHTML = '';
    FORM_TRAD_PARC.texto.value = '';
    FORM_TRAD_PARC.traducao.value = '';
    FORM_TRAD_PARC.alternativa.removeAttribute('placeholder');
    FORM_TRAD_PARC.adicionaropcao.removeAttribute('disabled');
    FORM_TRAD_PARC.adicionaratividade.removeAttribute('disabled');
    FORM_TRAD_PARC.alternativa.setAttribute('placeholder', `Alternativa 0 de ${MAX_PALAVRAS}`);
    atividade = '';
};
