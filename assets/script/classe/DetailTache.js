
export default class DetailTache{
    #el;
    #data;

    constructor(data, el) {
        this.#el = el;
        this.#data = data;
        this.#init();
    }
    #init() {
        console.log(this.#el)
        this.#injecterDetail();
    }

    async #injecterDetail() {
        const reponseDetail = await fetch("snippets/detail.html");
        let element = await reponseDetail.text();

        element = element.replace("{{ tache }}", this.#data.nom);
        element = element.replace("{{ importance }}", this.#data.importance);
        element = element.replace("{{ description }}", this.#data.description);
        this.#el.innerHTML = element;
    }
}