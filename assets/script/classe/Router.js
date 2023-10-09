import GestionnaireTache from "./GestionnaireTache.js";

export default class Router {
    #routes;
    #elTriggers;

    constructor() {
        const GT = GestionnaireTache.instance;
        this.#routes = {
            "form": GT.ouvrirFormulaire.bind(GT),
            "taches": GT.ouvrirTaches.bind(GT),
            "tache": GT.afficherDetail.bind(GT)
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

    appelExterne(param, id = null) {
        console.log(id)
        let href;
        switch(param) {
            case 'detail':
                href = `#tache/${id}`;
                break;
            case 'taches':
                href = '#taches';
                break;
            case 'nom':
                href = '#taches/nom';
                break;
            case 'importance':
                href = '#taches/importance';
                break;
        }
        history.pushState({data: data.id}, '', href);
        this.#gererChangementUrl();  
    }

    /**
     * gerer et aiguiller les requêtes selon le url de la page
     */
    #gererChangementUrl() {
        console.log("a;llo")
        const hash = location.hash.slice(1) || '/';
        const fragments = hash.split('/');
        const route = fragments[0];

        const routeFinale = this.#routes[route] || this.#routes['taches'];
        let id;


        if(fragments[1] != undefined && fragments[1] != '') id = history.state.data.id;
        console.log(id);
        if(id) routeFinale(id);
        else routeFinale();
    }
}
