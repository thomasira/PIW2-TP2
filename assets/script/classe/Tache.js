import GestionnaireTache from "./GestionnaireTache.js";

export default class Tache{
    #el;
    #elListe;
    #id;
    #nom;
    #description;
    #importance;
    #elTriggers;

    constructor(data, parent) {
        this.#el;
        this.#elListe = parent.querySelector('main');
        this.#elTriggers;
        this.#id = data.id;
        this.#nom = data.nom;
        this.#description = data.description;
        this.#importance = data.importance;
        this.#init();
    }

    #init() {
        if(this.#description == 'null' || this.#description == ''){
            this.#description = "Aucune description disponible";
        } 
    }

    async injecterTache() {
        const reponse = await fetch("snippets/tache.html");
        let element = await reponse.text();
        let importance;
        
        switch (this.#importance) {
            case 1: 
                importance = "haute";
                break;
            case 2:
                importance = "moyenne";
                break;
            case 3:
                importance = "basse";
                break;
        }

        element = element.replaceAll("{{ tache }}", this.#nom);
        element = element.replaceAll("{{ importance }}", importance)
        element = element.replaceAll("{{ id }}", this.#id);   

        this.#elListe.insertAdjacentHTML('beforeend', element);
        this.#el = this.#elListe.querySelector(`[data-js-tache="${this.#id}"]`);
        this.#elTriggers = this.#el.querySelector('[data-js-trigger]');
        this.#initBtns();
    }

    #initBtns() {
        this.#elTriggers.addEventListener('click', (e) => {
            if(e.target.dataset.jsTrigger == 'afficher') {
                const event = new CustomEvent('afficherDetail', { detail: this.getTacheInfo() });
                document.dispatchEvent(event);
            }
            if(e.target.dataset.jsTrigger == 'supprimer') {
                const event = new CustomEvent('supprimerTache', { detail: this.#id });
                document.dispatchEvent(event);
            }
        });
    }

    getTacheId() {
        return this.#id;
    }
    
    getTacheInfo() {
        return {
            id: this.#id,
            nom: this.#nom,
            description: this.#description,
            importance: this.#importance
        }
    }

}