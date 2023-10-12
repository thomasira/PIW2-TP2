import GestionnaireTache from "./GestionnaireTache.js";

export default class Router {
    #routes;

    constructor() {
        const GT = GestionnaireTache.instance;
        this.#routes = {
            "form": GT.ouvrirFormulaire.bind(GT),
            "taches": GT.ouvrirTaches.bind(GT),
            "tache": GT.afficherDetail.bind(GT)
        };
        this.#init();
    }

    #init() {
        window.addEventListener('popstate', () => this.#gererChangementUrl());
        this.#gererChangementUrl();
    }

    /**
     * gerer et aiguiller les requêtes selon le url de la page
     */
    #gererChangementUrl() {
        const hash = location.hash.slice(1) || '/';
        const fragments = hash.split('/');
        const route = fragments[0];
        const routeFinale = this.#routes[route] || this.#routes['taches'];

        let option;
        if(fragments[1] != undefined && fragments[1] != '') option = fragments[1];

        if(option) routeFinale(option);
        else routeFinale();
    }

    /**
     * recevoir les appels du GT et rerouter selon le paramètre, passer la donnée dans le state History.
     * 
     * @param {*} param -> string cible(obl)
     * @param {*} data -> objet donnée(opt)
     */
    appelExterne(param, data = null) {
        let href;
        switch(param) {
            case 'detail':
                href = `#tache/${data}`;
                break;
            case 'form':
                href = '#form';
                break;
            case 'taches':
                href = '#taches';
                break;
            case 'nom':
                href = '#taches/tache';
                break;
            case 'importance':
                href = '#taches/importance';
                break;
        }
        history.pushState({data: data}, '', href);
        this.#gererChangementUrl();  
    }
}
