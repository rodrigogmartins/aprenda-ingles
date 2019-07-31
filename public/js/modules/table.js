export const montarTabelaDeModulos = function(OBJECT, userId) {
    const MAP = new Map(Object.entries(OBJECT));
    const CHAVES = Object.keys(OBJECT);
    const TBODY = document.querySelector('#tbody');

    for (let i = 0; i < CHAVES.length; i++) {
        const MODULO = MAP.get(CHAVES[i]);
        if (!MODULO.privado || MODULO.criador === userId) {
            const TH_COD = criarLinhaTabela(CHAVES[i]);
            const TH_PERGUNTA = criarLinhaTabela(MODULO.nome);
            const TH_EDIT = document.createElement('th');
            const TH_DELETE = document.createElement('th');
            const TR = document.createElement('tr');
            const BTN_EDIT = criarBotaoEdit('#modalEditarModulo');
            const BTN_DELETE = criarBotaoDelete();

            TH_DELETE.appendChild(BTN_DELETE);
            TH_EDIT.appendChild(BTN_EDIT);
            TR.appendChild(TH_COD);
            TR.appendChild(TH_PERGUNTA);
            TR.appendChild(TH_EDIT);
            TR.appendChild(TH_DELETE);
            TR.dataset['key'] = CHAVES[i];
            TBODY.appendChild(TR);
        }
    }

    return new Promise(function(resolve) {
        resolve();
    });
};

export const montarTabelaDeAtividades = function(OBJECT) {
    const MAP = new Map(Object.entries(OBJECT));
    const CHAVES = Object.keys(OBJECT);
    const TBODY = document.querySelector('#tbody');

    for (let i = 0; i < CHAVES.length - 3; i++) {
        const ATIVIDADE = MAP.get(CHAVES[i]);
        const TH_COD = criarLinhaTabela(CHAVES[i]);
        const TH_PERGUNTA = criarLinhaTabela(ATIVIDADE.pergunta);
        const TH_EDIT = document.createElement('th');
        const TH_DELETE = document.createElement('th');
        const TR = document.createElement('tr');
        const BTN_EDIT = criarBotaoEdit('#modalEditarAtividade');
        const BTN_DELETE = criarBotaoDelete();

        TH_DELETE.appendChild(BTN_DELETE);
        TH_EDIT.appendChild(BTN_EDIT);
        TR.appendChild(TH_COD);
        TR.appendChild(TH_PERGUNTA);
        TR.appendChild(TH_EDIT);
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

const criarBotaoEdit = function(targetModal) {
    const BTN_EDIT = document.createElement('button');
    const ICON = document.createElement('i');
    ICON.setAttribute('class', 'fas fa-pen');
    BTN_EDIT.setAttribute('class', 'btn btn-sm btn-block btn-warning');
    BTN_EDIT.setAttribute('id', 'btn-edit');
    BTN_EDIT.setAttribute('data-toggle', 'modal');
    BTN_EDIT.setAttribute('data-target', targetModal);
    BTN_EDIT.appendChild(ICON);

    return BTN_EDIT;
};

const criarBotaoDelete = function() {
    const BTN_DELETE = document.createElement('button');
    BTN_DELETE.textContent = 'X';
    BTN_DELETE.setAttribute('id', 'btn-delete');
    BTN_DELETE.setAttribute('class', 'btn btn-sm btn-block btn-danger');

    return BTN_DELETE;
};
