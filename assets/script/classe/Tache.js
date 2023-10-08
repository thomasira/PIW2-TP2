
export default class Tache{
    #elParent;
    #id;
    #nom;
    #description;
    #importance;
    #elTriggers;
    #elDetailBox;

    constructor(tache) {
        this.#elDetailBox = conteneur.querySelector('[data-js-box="detail"]');
        this.#id = tache.id;
        this.#nom = tache.nom;
        this.#description = tache.description;
        this.#importance = tache.importance;
        this.#elTriggers;
        this.#init();
    }

    #init() {
        this.#injecterTache();
    }

    async #injecterTache() {
        const reponse = await fetch("snippets/tache.html");
        let elTache = await reponse.text();
        elTache = elTache.replaceAll("{{ tache }}", this.#nom);
        elTache = elTache.replaceAll("{{ importance }}", this.#importance)
        elTache = elTache.replace("{{ id }}", this.#id);
        this.#elParent.insertAdjacentHTML('beforeend', elTache);
        this.#elTriggers = this.#elParent.lastChild.querySelector('[data-js-trigger]');
        this.#initBtns();
    }

    #initBtns() {
        this.#elTriggers.addEventListener('click', (e) => {
            if(e.target.dataset.jsTrigger == 'afficher') {
                this.#injecterDetail();
                const event = new CustomEvent('afficherDetail', { detail: this.#id });
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
    
    async #injecterDetail(conteneur) {
        elDetail = elDetail.replaceAll("{{ tache }}", this.#nom);
        elDetail = elDetail.replaceAll("{{ importance }}", this.#importance);
        elDetail = elDetail.replaceAll("{{ description }}", this.#description);
        conteneur.innerHTML = elDetail;
    }
}