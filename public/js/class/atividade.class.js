export class Atividade {
    constructor(codigo, tempoInicio, tempoPause, pergunta, resposta) {
        this._codigo = codigo;
        this._tempoInicio = tempoInicio;
        this._tempoPause = tempoPause;
        this._pergunta = pergunta;
        this._resposta = resposta;
        this._alternativas = [];
    }

    set addOption(alternativa) {
        if (this._alternativas.length < 3) {
            this._alternativas.push(alternativa);
        }
    }

    set alternativas(alternativas) {
        this._alternativas = alternativas;
    }

    get codigo() {
        return this._codigo;
    }

    get tempoInicio() {
        return this._tempoInicio;
    }

    get tempoPause() {
        return this._tempoPause;
    }

    get pergunta() {
        return this._pergunta;
    }

    get resposta() {
        return this._resposta;
    }

    get alternativas() {
        return this._alternativas;
    }
}
