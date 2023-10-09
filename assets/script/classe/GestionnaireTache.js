import Router from "./Router.js";
import Formulaire from "./Formulaire.js";
import DetailTache from "./DetailTache.js";
import Tache from "./Tache.js";
import Api from "./Api.js";

export default class GestionnaireTache{
    #elApp;
    #elPages;
    #aTaches;
    #api;
    #router;

    constructor() {
        if (GestionnaireTache.instance == null) GestionnaireTache.instance = this;
        else throw new Error("Impossible de créer un deuxième gestionnaire de tâche");
        
        this.#elApp = document.querySelector('[data-js-app]');
        this.#router;
        this.#api = new Api;
        this.#aTaches = [];
        this.#elPages = {
            formulaire: this.#elApp.querySelector('[data-js-page="form"]'),
            taches: this.#elApp.querySelector('[data-js-page="taches"]'),
            detail: this.#elApp.querySelector('[data-js-page="detail"]')
        };

        this.#init();
    }

    async #init() {
        await this.#chercherHTML();
        await this.#chercherTaches();
        this.#initBtns();

        new Formulaire(this.#elPages.formulaire);
        this.#router = new Router();

        this.#aTaches.forEach(tache => tache.injecterTache()); 
        this.#gererEvenements();
    }

    async #chercherHTML(){
        const reponseForm = await fetch("snippets/formulaire.html");
        this.#elPages.formulaire.innerHTML = await reponseForm.text();

        const reponseTaches = await fetch("snippets/taches.html");
        this.#elPages.taches.innerHTML = await reponseTaches.text();
    }

    #initBtns() {
        const btnsTri = this.#elApp.querySelector('[data-js-triggers="tri"]');
        btnsTri.addEventListener('click', (e) => {
            if(e.target.dataset.jsTri == "alpha") this.#router.appelExterne('nom');
            else if(e.target.dataset.jsTri = "importance") this.#router.appelExterne('importance');
        });
    }

    async #trierTaches(option) {
        this.#aTaches = [];
        const taches = await this.#api.getTaches(option);
        taches.forEach(tache => {
            this.#aTaches.push(new Tache(tache, this.#elPages.taches));
        });
        this.#resetTaches();
    }

    #resetTaches() {
        const elTaches = this.#elPages.taches.querySelector('main');
        elTaches.innerHTML = "";
        this.#aTaches.forEach(tache => tache.injecterTache());
    }

    ouvrirFormulaire() {
        this.#elPages.formulaire.classList.remove('non-exist');
        this.#elPages.detail.classList.add('non-exist');
        this.#elPages.taches.classList.add('non-exist');
    }

    ouvrirTaches(triage) {
        if(triage) this.#trierTaches(triage);
        this.#elPages.formulaire.classList.add('non-exist');
        this.#elPages.taches.classList.remove('non-exist');
        this.#elPages.detail.classList.add('non-exist');
    }

    afficherDetail(id) {
        const target = this.#aTaches.find(tache => tache.getTacheId() == id);
        if(target){
            let data = target.getTacheInfo();
            new DetailTache(data, this.#elPages.detail);
            this.#elPages.detail.classList.remove('non-exist');
            this.#elPages.taches.classList.add('non-exist');
        } else {
            this.#router.appelExterne('taches');
        }
    }


    /**
     * écouter les événements perso et appeler les fonctions nécéssaires
     */
    #gererEvenements() {
        document.addEventListener('supprimerTache', (e) => this.#supprimerTache(e.detail));
        document.addEventListener('ajouterTache', (e) => this.#ajouterTache(e.detail));
        document.addEventListener('afficherDetail', (e) => this.#router.appelExterne("detail", e.detail));
    }

    /** Fonctions vers API */


    async #ajouterTache(data){
        const tacheId = await this.#api.createTache(data);
        data.id = tacheId;

        let tache = new Tache(data, this.#elPages.taches);
        tache.injecterTache();

        this.#aTaches.push(tache);
        this.#router.appelExterne("taches");
    }

    async #chercherTaches() {
        const taches = await this.#api.getTaches();

        taches.forEach(tache => {
            this.#aTaches.push(new Tache(tache, this.#elPages.taches));
        });
    }

    async #supprimerTache(id) {
        await this.#api.deleteTache(id);
        const HTMLTarget = this.#elPages.taches.querySelector(`[data-js-tache="${id}"]`);
        this.#aTaches = this.#aTaches.filter(tache => tache.getTacheId() != id);
        HTMLTarget.remove();
    }
}


