import { Router } from "./Router.js";

export default class GestionnaireTache{
    #conteneurForm;
    #conteneurTaches;
    #aTaches;

    constructor() {
        this.#conteneurForm = document.querySelector('[data-js-page="form"]');
        this.#conteneurTaches = document.querySelector('[data-js-page="taches"]');
        this.#aTaches = [];
        console.log(this.#conteneurTaches)

        this.#init();
    }

    #init() {
        if (GestionnaireTache.instance == null) GestionnaireTache.instance = this;
        else throw new Error("Impossible de créer un deuxième gestionnaire de tâche");
    
        this.#conteneurForm.classList.add('non-exist');
        this.#testRead();
        new Router();
    
    }
    getAccueil() {
        this.getTaches();
    }
    async getForm() {
        const reponse = await fetch("snippets/formulaire.html");
        let form = await reponse.text();
        this.#conteneurForm.innerHTML = form;

        this.#conteneurForm.classList.remove('non-exist');
        this.#conteneurTaches.classList.add('non-exist');
    }
    getTaches() {
        this.#conteneurTaches.classList.remove('non-exist');
        this.#conteneurForm.classList.add('non-exist');
    }
        
    async #searchTache(tache) {
        const reponse = await fetch("snippets/tache.html");
        let elTache = await reponse.text();
        elTache = elTache.replaceAll("{{ tache }}", tache.nom);
        elTache = elTache.replaceAll("{{ importance }}", tache.importance)
        this.#conteneurTaches.insertAdjacentHTML('beforeend', elTache)
    }

    async #testRead() {
        const reponse = await fetch("api/readTache.php");
        let taches = await reponse.json();
        taches.forEach(tache => {
            this.#aTaches.push(tache);
            this.#searchTache(tache);
        });
    }



}