import Router from "./Router.js";
import Formulaire from "./Formulaire.js";
import Tache from "./Tache.js";
import Api from "./Api.js";

export default class GestionnaireTache{
    #elApp;
    #elPages;
    #aTaches;
    #api;

    constructor() {
        if (GestionnaireTache.instance == null) GestionnaireTache.instance = this;
        else throw new Error("Impossible de créer un deuxième gestionnaire de tâche");
        
        this.#elApp = document.querySelector('[data-js-app]')
        this.#elPages = {
            formulaire: this.#elApp.querySelector('[data-js-page="form"]'),
            taches: this.#elApp.querySelector('[data-js-page="taches"]'),
            detail: this.#elApp.querySelector('[data-js-page="detail"]')
        };
        this.#api = new Api;
        this.#aTaches = [];

        this.#init();
    }

    async #init() {
        this.#chercherTaches();
        await this.#chercherHTML();
        new Router();
        new Formulaire(this.#elPages.formulaire);

        this.#gererEvenements();
    }

    async #chercherHTML(){
        const reponseForm = await fetch("snippets/formulaire.html");
        this.#elPages.formulaire.innerHTML = await reponseForm.text();

        const reponseDetail = await fetch("snippets/detail.html");
        this.#elPages.detail.innerHTML = await reponseDetail.text();
    }
    
    async #chercherTaches() {
        const taches = await this.#api.getTaches();
        taches.forEach(tache => {
            this.#aTaches.push(new Tache(tache, this.#elPages.taches));
        });
    }

    #resetTaches() {
        this.#aTaches.forEach(tache => {
             
        })
    }
    async #supprimerTache(id) {
        await this.#api.deleteTache(id);
        this.#aTaches = this.#aTaches.filter(tache => tache.getTacheId() != id);
    }

    ouvrirFormulaire() {
        this.#elPages.formulaire.classList.remove('non-exist');
        this.#elPages.taches.classList.add('non-exist');
    }

    ouvrirTaches() {
        this.#elPages.formulaire.classList.add('non-exist');
        this.#elPages.taches.classList.remove('non-exist');
    }

    ouvrirDetail() {
        this.#elPages.detail.classList.remove('non-exist');
    }
    #afficherDetail(id) {
        const target = this.#aTaches.find(tache => tache.getTacheId() == id);
    }
    async #getDetail() {
        const reponse = await fetch("snippets/detail.html");
        let elDetail = await reponse.text();
    }

    #affichagePage(page) {

    }
    #gererEvenements() {
        document.addEventListener('supprimerTache', (e) => this.#supprimerTache(e.detail));
    }
}