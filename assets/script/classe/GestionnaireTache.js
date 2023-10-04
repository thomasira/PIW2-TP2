import { Router } from "./Router.js";

export default class GestionnaireTache{
    #conteneurForm;
    #conteneurTaches;
    #aTaches;

    constructor() {
        this.#conteneurForm = document.querySelector('[data-js-form]');
        this.#conteneurTaches = document.querySelector('[data-js-taches]');
        this.#aTaches = [];
        this.#init();
    }

    #init() {
        if (GestionnaireTache.instance == null) GestionnaireTache.instance = this;
        else throw new Error("Impossible de créer un deuxième gestionnaire de tâche");
    
        this.searchForm();
        this.#testRead();
        new Router();
        console.log(this.#aTaches)
    
    }
    async searchForm() {
        const reponse = await fetch("snippets/formulaire.html");
        let form = await reponse.text();
        this.#conteneurForm.insertAdjacentHTML('beforeend', form);
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
    
    getAccueil() {
        console.log('accueil')
    }
    


}