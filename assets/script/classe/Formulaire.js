import Validateur from "./Validateur.js";

export default class Formulaire{
    #el;
    #elForm;
    #elErreur;
    #validateur;

    constructor(el) {
        this.#el = el;
        this.#elForm = this.#el.querySelector('form');
        this.#elErreur = {
            nom: this.#elForm.querySelector('[data-js-label="nom"]'),
            description: this.#elForm.querySelector('[data-js-label="description"]'),
            importance: this.#elForm.querySelector('[data-js-label="importance"]')
        }
        this.#validateur = new Validateur;
        this.#init();
    }

    #init() {
        this.#el.addEventListener('submit', (e) =>{
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
            dataTache.id = await reponse.text();

            const event = new CustomEvent('ajouterTache', { detail: dataTache });
            document.dispatchEvent(event);
            
            this.#elForm.reset();
        }
    }
}