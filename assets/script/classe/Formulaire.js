import Validateur from "./Validateur.js";

export default class Formulaire{
    #el;
    #elForm;
    #validateur;

    constructor() {
       this.#el = document.querySelector('[data-js-page="form"]');
       this.#elForm;
       this.#validateur = new Validateur;
       this.#init();
    }

    #init() {
        this.#getForm();
        this.#el.addEventListener('submit', (e) =>{
            e.preventDefault();
            this.#gererFormulaire();
        })
    }

    async #getForm() {
        const reponse = await fetch("snippets/formulaire.html");
        let form = await reponse.text();
        this.#el.innerHTML = form;
        this.#elForm = this.#el.querySelector('form');
    }

    async #gererFormulaire() {
        if(this.#validateur.validerTout(this.#elForm)){
            console.log('ok')
        };

        const dataTache = {
            nom:this.#elForm.nom.value,
            description: this.#elForm.description.value,
            importance: this.#elForm.importance.value
        };
        const config = {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(dataTache),
        };

        const url = `api/createTache.php`;
        const reponse = await fetch(url, config);
        const message = await reponse.json();
        this.#elForm.reset();
        return message;
    }
}