
export default class DetailTache{
    #el;

    constructor(el) {
        this.#el = el;
        this.#init();
    }
    #init() {
        this.#injecterDetail(this.#el);
    }

    async #injecterDetail(tache) {
        const reponseDetail = await fetch("snippets/detail.html");
        let element = await reponseDetail.text();

        element = element.replace("{{ tache }}", tache.nom);
        element = element.replace("{{ importance }}", tache.importance);
        element = element.replace("{{ description }}", tache.description);
        this.#el.innerHTML = element;
    }
}