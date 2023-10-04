import GestionnaireTache from "./GestionnaireTache.js";

export class Router {
    #routes;
    #elTriggerForm;
    #elTriggerTaches;

    constructor() {
        const GT = GestionnaireTache.instance;
        this.#routes = {
            "form": GT.getForm.bind(GT),
            "taches": GT.getTaches.bind(GT),
            "accueil": GT.getAccueil.bind(GT)
        };
        this.#elTriggerForm = document.querySelector('[data-js-trigger="page-form"]');
        this.#elTriggerTaches = document.querySelector('[data-js-trigger="page-taches"]');
        this.#init();
    }

    #init() {

        /**
         * écouter un événement clic sur les 'a' correspondant aux équipes.
         * changer le url dans l'objet history et appeler 'gererChangementUrl()'
         */
        this.#elTriggerForm.addEventListener('click', (e) => {
            const href = e.target.dataset.jsHref;
            history.pushState({}, '', href);
            this.gererChangementUrl();
        })
        this.#elTriggerTaches.addEventListener('click', (e) => {
            const href = e.target.dataset.jsHref;
            history.pushState({}, '', href);
            this.gererChangementUrl();
        })
        window.addEventListener('popstate', () => this.gererChangementUrl());

        /**
         * écouter un événement 'popstate' sur le document et appeler gererChangementUrl();
         */
        window.addEventListener('popstate', () => this.gererChangementUrl());

        this.gererChangementUrl();
    }

    /**
     * gerer et aiguiller les requêtes selon le url de la page
     */
    gererChangementUrl() {
        const hash = location.hash.slice(1) || '/';

        const fragments = hash.split('/');
        const routeFinale = this.#routes[hash] || this.#routes['accueil'];
        let id;

        if(fragments[1] != undefined && fragments[1] != '') {
            id = history.state.id;
        } 
        console.log(routeFinale);

        if(id) routeFinale(id);
        else routeFinale();
    }
}
