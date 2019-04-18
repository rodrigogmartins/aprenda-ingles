export class Modulo {

    constructor(privado, nome, criador) {
        this._privado = privado;
        this._nome = nome;
        this._criador = criador;
    }

    get privado() {
        return this._privado;
    }

    get nome() {
        return this._nome;
    }

    get criador() {
        return this._criador;
    }
}
