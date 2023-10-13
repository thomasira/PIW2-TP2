import Router from './Router.js';
import Formulaire from './Formulaire.js';
import DetailTache from './DetailTache.js';
import Tache from './Tache.js';
import Api from './Api.js';

export default class GestionnaireTache{
    #elApp;
    #elPages;
    #aTaches;
    #api;
    #router;

    constructor() {
        if (GestionnaireTache.instance == null) GestionnaireTache.instance = this;
        else throw new Error('Impossible de créer un deuxième gestionnaire de tâche');
        
        // les objets, router est initialisé plus tard
        this.#router;
        this.#api = new Api;

        //tableau d'objets tâche
        this.#aTaches = [];

        // éléments HTML
        this.#elApp = document.querySelector('[data-js-app]');
        this.#elPages = {
            formulaire: this.#elApp.querySelector('[data-js-page="form"]'),
            taches: this.#elApp.querySelector('[data-js-page="taches"]'),
            detail: this.#elApp.querySelector('[data-js-page="detail"]')
        };

        this.#init();
    }

    /**
     * initialiser toutes les fonctionnalitées de l'app.
     */
    async #init() {

        // on attends ces deux réponses avant de continuer
        await this.#chercherHTML();
        await this.#chercherTaches();

        // une fois le DOM chargé, on initialise les fonctionnalitées
        this.#initBtns();
        this.#gererEvenements();

        this.#router = new Router();
        this.#resetTaches();
        
        new Formulaire(this.#elPages.formulaire);
    }

    /**
     * chercher les snippets HTML et les injecter dans leurs sections respectives.
     */
    async #chercherHTML(){
        const reponseForm = await fetch('snippets/formulaire.html');
        this.#elPages.formulaire.innerHTML = await reponseForm.text();

        const reponseTaches = await fetch('snippets/taches.html');
        this.#elPages.taches.innerHTML = await reponseTaches.text();
    }

    /**
     * initialiser les boutons généraux(excluant ceux de chaque tâche).
     */
    #initBtns() {
        const btns = this.#elApp.querySelector('[data-js-triggers]');
        btns.addEventListener('click', (e) => {
            if(e.target.dataset.jsHref == 'form') this.#router.appelExterne('form');
            else if(e.target.dataset.jsTri == 'alpha') this.#router.appelExterne('nom');
            else if(e.target.dataset.jsTri = 'importance') this.#router.appelExterne('importance');
        });
    }

    /**
     * vider le tableau de tâches et le remplir avec les tâches triées de API, appeler un réinit..
     * 
     * @param {*} triage -> string triage('nom', 'importance')
     */
    async #trierTaches(triage) {
        this.#aTaches = [];
        const taches = await this.#api.getTaches(triage);
        taches.forEach(tache => {
            this.#aTaches.push(new Tache(tache, this.#elPages.taches));
        });
        this.#resetTaches();
    }

    /**
     * réinitialiser la boîte de tâche(DOM).
     */
    #resetTaches() {
        const elTaches = this.#elPages.taches.querySelector('main');

        elTaches.innerHTML = "";
        this.#aTaches.forEach(tache => tache.injecterTache());
    }

    /**
     * ouvrir la boîte formulaire(DOM).
     */
    ouvrirFormulaire() {
        this.#elPages.taches.classList.add('darken');
        this.#elPages.formulaire.classList.remove('hide-left');
        this.#elPages.detail.classList.add('hide-left');
/*         this.#elPages.taches.classList.add('non-exist'); */
    }

    /**
     * ouvrir la boîte de tâches(DOM) et appeler triage au besoin.
     * 
     * @param {*} triage -> string triage('nom', 'importance')
     */
    ouvrirTaches(triage) {
        if(triage) this.#trierTaches(triage);
        this.#elPages.taches.classList.remove('darken');
        this.#elPages.formulaire.classList.add('hide-left');
        this.#elPages.detail.classList.add('hide-left');
    }

    /**
     * À fixer. trouver la tâche et si existe, crée un nouvel objet DétailTache et l'affiche.
     * 
     * @param {*} id -> id de la tâche cible
     */
    afficherDetail(id) {
        const target = this.#aTaches.find(tache => tache.getTacheId() == id);
        if(target) {
            let data = target.getTacheInfo();
            new DetailTache(data, this.#elPages.detail);
            this.#elPages.taches.classList.add('darken');
            this.#elPages.detail.classList.remove('hide-left');
            this.#elPages.formulaire.classList.add('hide-left');
        } else this.#router.appelExterne('taches');
    }

    #fermerFormulaire() {
        this.#router.appelExterne('taches');
    }

    #fermerDetail() {
        this.#router.appelExterne('taches');
        
    }

    /**
     * écouter tous les événements perso et appeler les fonctions nécéssaires.
     */
    #gererEvenements() {
        document.addEventListener('supprimerTache', (e) => this.#supprimerTache(e.detail));
        document.addEventListener('ajouterTache', (e) => this.#ajouterTache(e.detail));
        document.addEventListener('afficherDetail', (e) => this.#router.appelExterne('detail', e.detail));
        document.addEventListener('fermerFormulaire', () => this.#fermerFormulaire());
        document.addEventListener('fermerDetail', () => this.#fermerDetail());
    }

    /** méthodes vers API */

    /**
     * envoyer la donnée par API et créer une tâche, créer un objet tâche, l'injecter et l'ajouter au tableau de tâches et appeler un changement de route.
     * 
     * @param {*} data -> donnée reçu du formulaire
     */
    async #ajouterTache(data){

        const tacheId = await this.#api.createTache(data);
        data.id = tacheId;

        let tache = new Tache(data, this.#elPages.taches);
        tache.injecterTache();

        this.#aTaches.push(tache);
        this.#router.appelExterne('taches');
    }

    /**
     * lire toutes les tâches par API et les pousser dans le tableau de tâches.
     */
    async #chercherTaches() {
        const taches = await this.#api.getTaches();

        taches.forEach(tache => {
            this.#aTaches.push(new Tache(tache, this.#elPages.taches));
        });
    }

    /**
     * supprimer une tâche par API, la supprimer du DOM et du tableau de tâches.
     * 
     * @param {*} id -> id de la tâche cible
     */
    async #supprimerTache(id) {
        await this.#api.deleteTache(id);
        this.#aTaches = this.#aTaches.filter(tache => tache.getTacheId() != id);
        const HTMLTarget = this.#elPages.taches.querySelector(`[data-js-tache='${id}']`);
        HTMLTarget.remove();
        this.#router.appelExterne('taches');
    }
}


