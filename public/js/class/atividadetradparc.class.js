export class AtividadeTraducaoParcial {
    constructor(texto, resposta, tipo) {
        this._texto = texto;
        this._resposta = resposta;
        this._alternativas = [];
        this._tipo = tipo;
    }

    set addOption(alternativa) {
        if (this._alternativas.length <= 8) {
            this._alternativas.push(alternativa);
        }
    }

    set alternativas(alternativas) {
        this._alternativas = alternativas;
    }

    get tipo() {
        return this._tipo;
    }

    get texto() {
        return this._texto;
    }

    get resposta() {
        return this._resposta;
    }

    get alternativas() {
        return this._alternativas;
    }
}
