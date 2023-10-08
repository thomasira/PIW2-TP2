import GestionnaireTache from "./GestionnaireTache.js";

export default class Tache{
    #el;
    #elListe;
    #id;
    #nom;
    #description;
    #importance;
    #elTriggers;
    #elDetailBox;

    constructor(data, parent) {
        this.#el;
        this.#elListe = parent.querySelector('main');
        this.#elTriggers;
        /* this.#elDetailBox = conteneur.querySelector('[data-js-box="detail"]'); */
        this.#id = data.id;
        this.#nom = data.nom;
        this.#description = data.description;
        this.#importance = data.importance;
        this.#init();
    }

    #init() {
        /* this.#creerTache(); */
    }


    async injecterTache() {
        const reponse = await fetch("snippets/tache.html");
        let element = await reponse.text();

        element = element.replaceAll("{{ tache }}", this.#nom);
        element = element.replaceAll("{{ importance }}", this.#importance)
        element = element.replace("{{ id }}", this.#id);   

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
            nom: this.#nom,
            description: this.#description,
            importance: this.#importance
        }
    }

/*     async #injecterDetail(conteneur) {
        elDetail = elDetail.replaceAll("{{ tache }}", this.#nom);
        elDetail = elDetail.replaceAll("{{ importance }}", this.#importance);
        elDetail = elDetail.replaceAll("{{ description }}", this.#description);
        conteneur.innerHTML = elDetail;
    } */
}