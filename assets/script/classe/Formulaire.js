import Validateur from "./Validateur.js";

export default class Formulaire{
    #el;
    #elForm;
    #elErreur;
    #validateur;

    constructor(el) {
        this.#validateur = new Validateur;
        this.#el = el;
        this.#elForm = this.#el.querySelector('form');
        this.#elErreur = {
            nom: this.#elForm.querySelector('[data-js-label="nom"]'),
            description: this.#elForm.querySelector('[data-js-label="description"]'),
            importance: this.#elForm.querySelector('[data-js-label="importance"]')
        }
        this.#init();
    }

    #init() {
        this.#el.addEventListener('submit', (e) => {
            e.preventDefault();
            this.#gererFormulaire();
        });
    }

    async #gererFormulaire() {
        this.#elErreur.nom.innerHTML = "";
        this.#elErreur.description.innerHTML = "";
        this.#elErreur.importance.innerHTML = "";

        if(this.#validateur.validerTout(this.#elForm)){
            const error = this.#validateur.validerTout(this.#elForm);

            if(error.nom) this.#elErreur.nom.textContent = error.nom;
            if(error.description) this.#elErreur.description.textContent = error.description;
            if(error.importance) this.#elErreur.importance.textContent = error.importance;

        } else {
            const data = {
                nom:this.#elForm.nom.value,
                description: this.#elForm.description.value,
                importance: parseInt(this.#elForm.importance.value)
            };

            const event = new CustomEvent('ajouterTache', { detail: data });
            document.dispatchEvent(event);
            this.#elForm.reset();
        }
    }
}