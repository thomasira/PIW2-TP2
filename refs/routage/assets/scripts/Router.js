import GestionnaireLigue from "./GestionnaireLigue.js";

export default class Router {
    #conteneur;
    #nav;
    #routes;
    #main;

    constructor() {
        this.#conteneur = document.querySelector("[data-component='router']");
        this.#nav = this.#conteneur.querySelector("[data-nav-list]");
        this.#main = this.#conteneur.querySelector("main");

        this.#routes = {
            equipes: GestionnaireLigue.instance.getEquipes.bind(GestionnaireLigue.instance),
            "equipes/id": GestionnaireLigue.instance.getJoueursParEquipe.bind(GestionnaireLigue.instance),
            "ajout-joueur": GestionnaireLigue.instance.ajouterJoueur.bind(GestionnaireLigue.instance),
            accueil: GestionnaireLigue.instance.accueil.bind(GestionnaireLigue.instance),
        };

        this.init();
    }

    init() {

        /**
         * écouter un événement clic sur les 'a' du menu.
         * changer le url dans l'objet history et appeler 'gererChangementUrl()'
         */
         this.#nav.addEventListener('click', (e) => {
            if(e.target.closest('[data-href]')) {
                const href = e.target.closest('[data-href]').dataset.href;
                history.pushState({}, '', href);
                this.gererChangementUrl();
            };
        });

        /**
         * écouter un événement clic sur les 'a' correspondant aux équipes.
         * changer le url dans l'objet history et appeler 'gererChangementUrl()'
         */
        this.#main.addEventListener('click', (e) => {
            if(e.target.closest('[data-equipe]')) {
                const id = e.target.closest('[data-equipe]').dataset.equipe;
                const href = `#equipes/id`;
                history.pushState({id: id}, '', href);
                this.gererChangementUrl();
            }
        });

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
