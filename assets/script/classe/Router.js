import GestionnaireTache from "./GestionnaireTache.js";

export class Router {
    #routes;

    constructor() {
        const GT = GestionnaireTache.instance;
        this.#routes = {
            "form": GT.searchForm.bind(GT),
            "accueil": GT.getAccueil.bind(GT)
        };

        this.#init();
    }

    #init() {

        /**
         * écouter un événement clic sur les 'a' correspondant aux équipes.
         * changer le url dans l'objet history et appeler 'gererChangementUrl()'
         */


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
