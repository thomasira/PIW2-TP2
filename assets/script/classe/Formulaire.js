import Validateur from "./Validateur.js";

export default class Formulaire{
    #el;
    #elForm;
    #elErreur;
    #validateur;
    #elParent;
    #elClose;

    constructor(el) {
        this.#validateur = new Validateur;
        this.#el = el;
        this.#elClose = this.#el.querySelector('[data-js-trigger="close"]');
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

        this.#elClose.addEventListener('click', () => {
            const event = new Event('fermerFormulaire');
            document.dispatchEvent(event);
        })
    }

    async #gererFormulaire() {
        this.#elErreur.nom.innerHTML = "";
        this.#elErreur.description.innerHTML = "";
        this.#elErreur.importance.innerHTML = "";

        if(this.#validateur.validerTout(this.#elForm)){
            const error = this.#validateur.validerTout(this.#elForm);

            if(error.nom) {
                this.#elErreur.nom.textContent = error.nom;
                this.#elErreur.nom.closest('label').classList.add('error');
            }
            if(error.description) {
                this.#elErreur.description.textContent = error.description;
                this.#elErreur.description.closest('label').classList.add('error');

            } 
            if(error.importance){
                this.#elErreur.importance.textContent = error.importance;
                this.#elErreur.importance.closest('div').classList.add('error');
            } 


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