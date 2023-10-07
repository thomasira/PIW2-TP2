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
        });
    }

    async #getForm() {
        const reponse = await fetch("snippets/formulaire.html");
        let form = await reponse.text();
        this.#el.innerHTML = form;
        this.#elForm = this.#el.querySelector('form');
        this.#elForm.champNom = this.#elForm.querySelector('[data-js-label="nom"]');
        this.#elForm.champDescription = this.#elForm.querySelector('[data-js-label="description"]');
        this.#elForm.champImportance = this.#elForm.querySelector('[data-js-label="importance"]');
    }

    async #gererFormulaire() {
        this.#elForm.champNom.innerHTML = "";
        this.#elForm.champDescription.innerHTML = "";
        this.#elForm.champImportance.innerHTML = "";

        if(this.#validateur.validerTout(this.#elForm)){
            const error = this.#validateur.validerTout(this.#elForm);

            if(error.nom) this.#elForm.champNom.textContent = error.nom;
            if(error.description) this.#elForm.champDescription.textContent = error.description;
            if(error.importance) this.#elForm.champImportance.textContent = error.importance;

        } else {
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
            const url = `api/tache/create.php`;


            
            const reponse = await fetch(url, config);
            this.#elForm.reset();
            //redirect to tache detail via custom event maybe;
        }
    }
}