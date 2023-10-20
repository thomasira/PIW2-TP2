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
        
        // les classes requises, router est initialisé dans #init()
        this.#router;
        this.#api = new Api;

        //tableau d'objets tâche
        this.#aTaches = [];

        // l'élément HTML de l'app entière
        this.#elApp = document.querySelector('[data-js-app]');

        //les pages de l'app
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

        //appeler une injection des tâches
        this.#resetTaches();
        
        new Formulaire(this.#elPages.formulaire);

        //tout les éléments doivent exister avant d'instancier le routeur
        this.#router = new Router();
    }

    /**
     * envoyer la donnée par l'API et créer une tâche, créer un objet tâche, l'injecter et l'ajouter au tableau de tâches et appeler un changement de route.
     * 
     * @param {*} data -> donnée reçu du formulaire
     */
    async #ajouterTache(data){
        const tacheId = await this.#api.createTache(data);
        data.id = tacheId;

        let tache = new Tache(data, this.#elPages.taches);
        tache.injecterTache('before'); //param pour insérer la tâche dans le haut du HTML

        this.#aTaches.push(tache);
        this.#router.appelExterne('taches');
    }

    /**
     * centrer la boîte passé en param dans l'écran dynamiquement pour permettre une transition
     * 
     * @param {*} element 
     */
    #centerHTML(element) {
        let elementRect = element.getBoundingClientRect();
        let top = window.innerHeight/2 - elementRect.height/2 + window.scrollY;
        let left = window.innerWidth/2 - elementRect.width/2;

        let root = document.documentElement;
        root.style.setProperty('--left', left + 'px');
        root.style.setProperty('--top', top + 'px');
    }

    /**
     * chercher les snippets HTML et les injecter dans leurs sections respectives.
     */
    async #chercherHTML() {
        const reponseForm = await fetch('snippets/formulaire.html');
        this.#elPages.formulaire.innerHTML = await reponseForm.text();
    }

    /**
     * lire toutes les tâches par l'API et les pousser dans le tableau de tâches.
     */
    async #chercherTaches(triage) {
        this.#aTaches = [];
        const taches = await this.#api.getTaches(triage);
        taches.forEach(tache => {
            this.#aTaches.push(new Tache(tache, this.#elPages.taches));
        });
    }
    
    /**
     * écouter tous les événements perso et appeler les fonctions nécéssaires.
     */
    #gererEvenements() {
        document.addEventListener('supprimerTache', (e) => this.#supprimerTache(e.detail));
        document.addEventListener('ajouterTache', (e) => this.#ajouterTache(e.detail));
        document.addEventListener('afficherDetail', (e) => this.#router.appelExterne('detail', e.detail));
        document.addEventListener('fermerBoite', () => this.#router.appelExterne('taches'));
    }

    /**
     * initialiser les boutons généraux(excluant ceux de chaque tâche).
     */
    #initBtns() {
        const btns = this.#elApp.querySelector('[data-js-triggers]');
        btns.addEventListener('click', (e) => {
            if(e.target.dataset.jsHref == 'form') this.#router.appelExterne('form');
            else if(e.target.dataset.jsTri == 'alpha') this.#router.appelExterne('nom');
            else if(e.target.dataset.jsTri == 'importance') this.#router.appelExterne('importance');
        });
    }

    /**
     * réinitialiser la boîte de tâche(DOM).
     */
    #resetTaches() {
        const elTaches = this.#elPages.taches.querySelector('section');
        elTaches.innerHTML = "";

        this.#aTaches.forEach(tache => tache.injecterTache());
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

    /**
     * trouver la tâche et si existe, crée un nouvel objet DétailTache et l'afficher.
     * 
     * @param {*} id -> id de la tâche cible
     */
    async afficherDetail(id) {
        const target = this.#aTaches.find(tache => tache.getTacheId() == id);

        if(target) {
            let data = target.getTacheInfo();

            // VERSION API
            /* let data = this.#api.getTacheId(id) */

            new DetailTache(data, this.#elPages.detail);

            this.#centerHTML(this.#elPages.detail);
            document.body.classList.add('no-scroll');
            this.#elPages.detail.classList.remove('hide-left');
            this.#elPages.formulaire.classList.add('hide-left');
            this.#elPages.taches.classList.add('darken');

        } else this.#router.appelExterne('taches');
    }
    
    /**
     * ouvrir la boîte formulaire(DOM).
     */
    ouvrirFormulaire() {
        this.#centerHTML(this.#elPages.formulaire);
        document.body.classList.add('no-scroll');
        this.#elPages.formulaire.classList.remove('hide-left');
        this.#elPages.taches.classList.add('darken');
        this.#elPages.detail.classList.add('hide-left');
    }

    /**
     * ouvrir la boîte de tâches(DOM) et appeler triage au besoin.
     * 
     * @param {*} triage -> string triage('nom', 'importance')
     */
    async ouvrirTaches(triage) {
        if(triage) {
            await this.#chercherTaches(triage);
            this.#resetTaches();
        }

        document.body.classList.remove('no-scroll');
        this.#elPages.taches.classList.remove('darken');
        this.#elPages.formulaire.classList.add('hide-left');
        this.#elPages.detail.classList.add('hide-left');
    }
}


