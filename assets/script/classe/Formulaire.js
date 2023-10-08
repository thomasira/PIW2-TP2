import Validateur from "./Validateur.js";

export default class Formulaire{
    #el;
    #elForm;
    #elChamps
    #validateur;

    constructor(el) {
        this.#el = el;
        this.#elForm = this.#el.querySelector('form');
        this.#elChamps = {
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
        this.#elChamps.nom.innerHTML = "";
        this.#elChamps.description.innerHTML = "";
        this.#elChamps.importance.innerHTML = "";

        if(this.#validateur.validerTout(this.#elForm)){
            const error = this.#validateur.validerTout(this.#elForm);

            if(error.nom) this.#elChamps.nom.textContent = error.nom;
            if(error.description) this.#elChamps.description.textContent = error.description;
            if(error.importance) this.#elChamps.importance.textContent = error.importance;

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
            const event = new Event('ajouterTache');
            document.dispatchEvent(event);
            //redirect to tache detail via custom event maybe;
        }
    }
}