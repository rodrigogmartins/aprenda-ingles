export class Atividade {
    constructor(url, tempoInicio, tempoPause, pergunta, resposta) {
        this._url = url;
        this._codigo = url.split('=')[1];
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

    get url() {
        return this._url;
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
