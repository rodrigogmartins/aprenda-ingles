import {buscarTodosModulos} from './modules/crud/modulo.crud';

document.addEventListener('DOMContentLoaded', function() {
    const SPINNER = document.querySelector('.spinner');
    const CONTEUDO = document.querySelector('#conteudo');

    buscarTodosModulos()
        .then(buildCardModuloAtividade)
        .then(function() {
            SPINNER.style.display = 'none';
            CONTEUDO.style.display = 'block';
        });
});

const buildCardModuloAtividade = function(MODULOS) {
    const MODULOS_DIV = document.querySelector('.modulos');
    const CHAVES = Object.keys(MODULOS);
    const MAP = new Map(Object.entries(MODULOS));

    for (const CHAVE of CHAVES) {
        const HTML_A = document.createElement('a');
        HTML_A.setAttribute('class',
            'modulo col-12 col-lg-5 col-xl-4 btn btn-light');
        HTML_A.setAttribute('href', `atividade.html?${CHAVE}`);
        HTML_A.textContent = MAP.get(CHAVE).nome;
        MODULOS_DIV.appendChild(HTML_A);
    }

    return new Promise(function(resolve) {
        resolve();
    });
};
