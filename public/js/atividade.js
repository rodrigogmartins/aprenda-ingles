import {mostraAtividade} from './modules/atividade.js';
import {getIdUsuario} from './modules/firebase-auth.js';
import {setProximaAtividade} from './modules/crud/atividade.crud.js';
import {mostraBarraDeProgresso,
    getAtividadeAtual} from './modules/progresso.js';

const SPINNER = document.querySelector('.spinner');
const CONTEUDO = document.querySelector('#conteudo');
const MENU_ADD_ATV = document.querySelector('#menu-add-atv');
const MENU_GER_ATV = document.querySelector('#menu-ger-atv');
const DIV_PLAYER = document.querySelector('#player');

document.addEventListener('DOMContentLoaded', function() {
    const MODULO = window.location.search;

    MENU_ADD_ATV.setAttribute('href', `./../adicionaratividade.html${MODULO}`);
    MENU_GER_ATV.setAttribute('href', `./../gerenciaratividade.html${MODULO}`);

    loadTagYoutube();
    mostraBarraDeProgresso();
    setTimeout(function() {
        getAtividadeAtual()
            .then(mostraAtividade);
    }, 2000);

    setTimeout(function() {
        const BUTTONS = document.querySelectorAll('.opcao');

        for (const BUTTON of BUTTONS) {
            BUTTON.addEventListener('click', function(event) {
                const OPCAO = event.target.textContent.trim();

                getAtividadeAtual()
                    .then(function(atividade) {
                        if (atividade.tipo === 'video') {
                            verificaAcertoVideo(OPCAO, atividade);
                        } else if (atividade.tipo === 'traducao-parcial') {
                            verificaAcertoTradParc(OPCAO, atividade);
                        } else if (atividade.tipo === 'traducao') {
                            const textoRespostaUsuario = document.querySelector('#resposta').value;

                            verificaAcertoTrad(textoRespostaUsuario, atividade);
                        }
                    });
            });
        }
    }, 2000);

    SPINNER.style.display = 'none';
    CONTEUDO.style.display = 'block';
});

const verificaAcertoTrad = function(opcao, atividade) {
    const OPCAO = opcao.trim().toLowerCase();
    const RESPOSTA = atividade.resposta.trim().toLowerCase();

    if (OPCAO === RESPOSTA) {
        getIdUsuario()
            .then(function(userId) {
                const MODULO = window.location.search.replace('?', '');

                setProximaAtividade(userId, MODULO);
            });
    }
}

const verificaAcertoTradParc = function(opcao, atividade) {
    const BUTTON = document.createElement('button');
    BUTTON.setAttribute('class', 'btn btn-lg btn-block btn-primary opcao selecionada col-12 col-lg-4 col-xl-4"');
    BUTTON.textContent = opcao;
    DIV_PLAYER.appendChild(BUTTON);

    const SELECIONADAS = document.querySelectorAll('.selecionada');
    let fraseFormada = '';

    for (const SELECIONADA of SELECIONADAS) {
        fraseFormada += (SELECIONADA.textContent.trim() + ' ');

        SELECIONADA.addEventListener('click', function(event) {
            event.target.remove();
        });
    }

    if (fraseFormada.trim().toLowerCase() === atividade.resposta.toLowerCase()) {
        getIdUsuario()
            .then(function(userId) {
                const MODULO = window.location.search.replace('?', '');

                setProximaAtividade(userId, MODULO);
            });
    }
};

const verificaAcertoVideo = function(opcao, atividade) {
    if (opcao === atividade.resposta) {
        getIdUsuario()
            .then(function(userId) {
                const MODULO = window.location.search.replace('?', '');

                setProximaAtividade(userId, MODULO);
            });
    } else {
        window.location.reload();
    }
};

const loadTagYoutube = function() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/player_api';

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
};
