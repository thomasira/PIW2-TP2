import Router from "./Router.js";
import Formulaire from "./Formulaire.js";
import Tache from "./Tache.js";

export default class GestionnaireTache{
    #conteneurForm;
    #conteneurTaches;
    #conteneurDetail;
    #aTaches;

    constructor() {
        if (GestionnaireTache.instance == null) GestionnaireTache.instance = this;
        else throw new Error("Impossible de créer un deuxième gestionnaire de tâche");
    
        this.#conteneurTaches = document.querySelector('[data-js-page="taches"]');
        this.#conteneurForm = document.querySelector('[data-js-page="form"]');
        this.#conteneurDetail = document.querySelector('[data-js-page="detail"]')
        this.#aTaches = [];

        this.#init();
    }

    #init() {

        new Formulaire();
        new Router();
        this.#getTaches(); 
        this.#gererEvenements();
    }

    async #getTaches() {
        const reponse = await fetch("api/tache/read.php");
        let taches = await reponse.json();
        taches.forEach(tache => {
            this.#aTaches.push(new Tache(tache, this.#conteneurTaches));
        });
    }

    async #deleteTache(id) {
        const config = {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(id),
        };
        const url = `api/tache/delete.php`;
        const reponse = await fetch(url, config);
        this.#aTaches = this.#aTaches.filter(tache => tache.getTacheId() != id);
    }

    #afficherDetail(id) {
        const target = this.#aTaches.find(tache => tache.getTacheId() == id);
        target.afficherDetail(this.#conteneurDetail);
    }


    #gererEvenements() {
        document.addEventListener('ouvrirFormulaire', () => {
            this.#conteneurForm.classList.remove('non-exist');
            this.#conteneurTaches.classList.add('non-exist');
        });
        
        document.addEventListener('ouvrirTaches', () => {
            this.#conteneurForm.classList.add('non-exist');
            this.#conteneurTaches.classList.remove('non-exist');
        });
        document.addEventListener('supprimerTache', (e) => this.#deleteTache(e.detail));

        /* document.addEventListener('afficherDetail', (e) => this.#afficherDetail(e.detail)); */
        
    }
}