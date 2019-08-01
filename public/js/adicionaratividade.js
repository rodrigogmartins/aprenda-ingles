const MENU_ATV = document.querySelector('#menu-atv');
const MENU_GER_ATV = document.querySelector('#menu-ger-atv');
const OPC_VIDEO = document.querySelector('#opc-video');
const OPC_TRAD_PARC = document.querySelector('#opc-trad-parc');
const FORM_VIDEO = document.querySelector('#add-atividade-video');
const FORM_TRAD_PARC = document.querySelector('#add-atividade-trad-parc');

document.addEventListener('DOMContentLoaded', function() {
    const MODULO = window.location.search;

    MENU_ATV.setAttribute('href', `./../atividade.html${MODULO}`);
    MENU_GER_ATV.setAttribute('href', `./../gerenciaratividade.html${MODULO}`);

    OPC_VIDEO.addEventListener('click', function() {
        FORM_TRAD_PARC.style.display = 'none';
        FORM_VIDEO.style.display = 'block';
    });

    OPC_TRAD_PARC.addEventListener('click', function() {
        FORM_TRAD_PARC.style.display = 'block';
        FORM_VIDEO.style.display = 'none';
    });
});

