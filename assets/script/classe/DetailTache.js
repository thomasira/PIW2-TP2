
export default class DetailTache{
    #el;
    #elTrigger;
    #data;

    constructor(data, el) {
        this.#el = el;
        this.#data = data;
        this.#elTrigger;
        this.#init();
    }

    /**
     * injecter le detail et initialiser ses boutons
     */
    async #init() {
        await this.#injecterDetail();
        this.#initClose();
    }
 
    /**
     * injecter les données de détail dans le snippet prévu
     */
    async #injecterDetail() {
        const reponseDetail = await fetch("snippets/detail.html");
        let elementHTML = await reponseDetail.text();

        elementHTML = elementHTML.replaceAll("{{ tache }}", this.#data.nom);
        elementHTML = elementHTML.replaceAll("{{ importance }}", this.#data.importance);
        elementHTML = elementHTML.replaceAll("{{ description }}", this.#data.description);
        
        this.#el.innerHTML = elementHTML;
        this.#elTrigger = this.#el.querySelector('[data-js-trigger="close"]');
    }

    /**
     * initialiser les boutons
     */
    #initClose() {
        const elMain = this.#el.closest('main');
        this.#el.addEventListener('click', (e) => {
            
            console.log(this.#el.dataset)
/*             console.log(e.target) */
        })
        console.log()
        this.#elTrigger.addEventListener('click', () => {
            const event = new Event('fermerDetail');
            document.dispatchEvent(event);
        })
    }
}