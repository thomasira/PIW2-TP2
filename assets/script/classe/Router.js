import GestionnaireTache from "./GestionnaireTache.js";

export default class Router {
    #routes;
    #elTriggers;

    constructor() {
        const GT = GestionnaireTache.instance;
        this.#routes = {
            "form": GT.ouvrirFormulaire.bind(GT),
            "taches": GT.ouvrirTaches.bind(GT),
            "tache/id": GT.afficherDetail.bind(GT),
            "accueil": GT.ouvrirTaches.bind(GT),
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

        document.addEventListener('afficherDetail', (e) => {
            const href = `#tache/id`;
            history.pushState({id: e.detail}, '', href);
            this.#gererChangementUrl();
        });
        
        window.addEventListener('popstate', () => this.#gererChangementUrl());
        this.#gererChangementUrl();
    }

    /**
     * gerer et aiguiller les requêtes selon le url de la page
     */
    #gererChangementUrl() {

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
