import GestionnaireTache from "./GestionnaireTache.js";

export default class Router {
    #routes;
    #elTriggers;

    constructor() {
        const GT = GestionnaireTache.instance;
        this.#routes = {
            "form": GT.ouvrirFormulaire.bind(GT),
            "taches": GT.ouvrirTaches.bind(GT),
            "tache/id": GT.afficherDetail.bind(GT)
        };
        this.#elTriggers = document.querySelector('[data-js-trigger]');
        this.#init();
    }

    #init() {
        this.#elTriggers.addEventListener('click', (e) => {
            if(e.target.dataset.jsHref) {
                const href = e.target.dataset.jsHref;
                history.pushState({}, '', href);
                this.#gererChangementUrl();
            }
        });
        window.addEventListener('popstate', () => this.#gererChangementUrl());
        this.#gererChangementUrl();
    }

    appelExterne(param, data = null) {
        if(param == "detail") {
            const href = '#tache/id';
            history.pushState({data: data}, '', href);
            this.#gererChangementUrl();  
        }
        if(param == 'taches') {
            const href = '#taches';
            history.pushState({}, '', href);
            this.#gererChangementUrl();
        }
    }

    /**
     * gerer et aiguiller les requêtes selon le url de la page
     */
    #gererChangementUrl() {

        const hash = location.hash.slice(1) || '/';
        const fragments = hash.split('/');
        const routeFinale = this.#routes[hash] || this.#routes['taches'];
        let data;

        if(fragments[1] != undefined && fragments[1] != '') data = history.state.data;

        if(data) routeFinale(data);
        else routeFinale();
    }
}
