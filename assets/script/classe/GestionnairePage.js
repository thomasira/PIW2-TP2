
export default class GestionnairePage{

    constructor(){
        this.el = document.querySelector('[data-js-main]');
        this.elForm = this.el.querySelector('[data-js-page="form"]');
        this.elTaches = this.el.querySelector('[data-js-page="taches"]');
        this.elDetail = this.el.querySelector('[data-js-page="detail"]');
        this.#init();
    }

    #init() {
        this.#chercherFormulaire();
    }

    async #chercherFormulaire() {
        const reponse = await fetch("snippets/formulaire.html");
        let form = await reponse.text();
        this.elForm.innerHTML = form;
    }


}