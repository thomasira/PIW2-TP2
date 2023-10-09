
export default class DetailTache{
    #el;
    #data;

    constructor(data, el) {
        this.#el = el;
        this.#data = data;
        this.#init();
    }

    #init() {
        this.#injecterDetail();
    }
 
    async #injecterDetail() {
        const reponseDetail = await fetch("snippets/detail.html");
        let elementHTML = await reponseDetail.text();

        elementHTML = elementHTML.replaceAll("{{ tache }}", this.#data.nom);
        elementHTML = elementHTML.replaceAll("{{ importance }}", this.#data.importance);
        elementHTML = elementHTML.replaceAll("{{ description }}", this.#data.description);
        
        this.#el.innerHTML = elementHTML;
    }
}