export class Modulo {

    constructor(nome, privado, criador) {
        this._nome = nome;
        this._privado = privado;
        this._criador = criador;
    }

    get nome() {
        return this._nome;
    }

    get privado() {
        return this._privado;
    }

    get criador() {
        return this._criador;
    }
}
