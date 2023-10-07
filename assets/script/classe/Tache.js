
export default class Tache{
    #elParent;
    #id;
    #nom;
    #description;
    #importance;
    #elTriggers;

    constructor(tache, elParent) {
        this.#elParent =  elParent;
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
        this.#elParent.insertAdjacentHTML('beforeend', elTache);
        this.#elTriggers = this.#elParent.lastChild.querySelector('[data-js-trigger]');
        this.#initBtns();
    }

    #initBtns() {
        this.#elTriggers.addEventListener('click', (e) => {
            if(e.target.dataset.jsTrigger == 'afficher') {
                console.log(this.#id);
            }
            if(e.target.dataset.jsTrigger == 'supprimer') {
                //new event
            }
        })
    }
}