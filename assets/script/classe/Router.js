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

        if(id) routeFinale(id);
        else routeFinale();
    }
}
