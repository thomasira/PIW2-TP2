import GestionnaireTache from "./GestionnaireTache.js";

export default class Tache{
    #el;
    #elListe;
    #id;
    #nom;
    #description;
    #importance;
    #elTriggers;

    /**
     * 
     * @param {*} data -> données d'une tâche
     * @param {*} elParent -> élément HTML parent
     */
    constructor(data, elParent) {
        this.#el;
        this.#elListe = elParent.querySelector('section');
        this.#elTriggers;
        this.#id = data.id;
        this.#nom = data.tache;
        this.#description = data.description;
        this.#importance = data.importance;
        this.#init();
    }

    /**
     * changer les données enregistrées d'une tâche
     */
    #init() {
        if(this.#description == 'null' || this.#description == ''){
            this.#description = "Aucune description disponible";
        } 
        switch (this.#importance) {
            case 1: 
                this.#importance = "haute";
                break;
            case 2:
                this.#importance = "moyenne";
                break;
            case 3:
                this.#importance = "basse";
                break;
        }
    }

    /**
     * initialiser les boutons
     */
    #initBtns() {
        this.#elTriggers.addEventListener('click', (e) => {
            if(e.target.dataset.jsTrigger == 'afficher') {
                const event = new CustomEvent('afficherDetail', { detail: this.#id });
                document.dispatchEvent(event);
            }
            if(e.target.dataset.jsTrigger == 'supprimer') {
                const event = new CustomEvent('supprimerTache', { detail: this.#id });
                document.dispatchEvent(event);
            }
        });
    }

    /**
     * injecter les données dans un snippet et l'injecter dans le conteneur parent
     * 
     * @param {*} before -> place l'élément dans le haut du HTML
     */
    async injecterTache(before) {
        const reponse = await fetch("snippets/tache.html");
        let element = await reponse.text();

        element = element.replaceAll("{{ tache }}", this.#nom);
        element = element.replaceAll("{{ importance }}", this.#importance)
        element = element.replaceAll("{{ id }}", this.#id);   

        if(before) this.#elListe.insertAdjacentHTML('afterbegin', element);
        else this.#elListe.insertAdjacentHTML('beforeend', element);

        this.#el = this.#elListe.querySelector(`[data-js-tache="${this.#id}"]`);
        this.#elTriggers = this.#el.querySelector('[data-js-trigger]');
        
        this.#initBtns();
    }

    /**
     * 
     * @returns id de la tâche
     */
    getTacheId() {
        return this.#id;
    }
    
    /**
     * 
     * @returns toutes les prop. de la tâche
     */
    getTacheInfo() {
        return {
            id: this.#id,
            nom: this.#nom,
            description: this.#description,
            importance: this.#importance
        }
    }

}