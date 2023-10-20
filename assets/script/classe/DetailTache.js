
export default class DetailTache{
    #el;
    #elClose;
    #data;

    /**
     * 
     * @param {*} data -> donnée requise
     * @param {*} el -> élément HTML
     */
    constructor(data, el) {
        this.#el = el;
        this.#data = data;
        this.#elClose;
        this.#init();
    }

    /**
     * injecter le detail et initialiser ses boutons
     */
    async #init() {
        await this.#injecterDetail();
        this.#initBtn();
    }

     /**
     * initialiser la gestion de fermeture
     */
     #initBtn() {
        this.#elClose.addEventListener('click', () => {
            const event = new Event('fermerBoite');
            document.dispatchEvent(event)
        });
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
        this.#elClose = this.#el.querySelector('[data-js-trigger="close"]');
    }


}