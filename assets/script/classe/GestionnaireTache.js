import Router from "./Router.js";
import Formulaire from "./Formulaire.js";
import Tache from "./Tache.js";

export default class GestionnaireTache{
    #conteneurForm;
    #conteneurTaches;
    #aTaches;

    constructor() {
        if (GestionnaireTache.instance == null) GestionnaireTache.instance = this;
        else throw new Error("Impossible de créer un deuxième gestionnaire de tâche");
    
        this.#conteneurTaches = document.querySelector('[data-js-page="taches"]');
        this.#conteneurForm = document.querySelector('[data-js-page="form"]');
        this.#aTaches = [];

        this.#init();
    }

    #init() {

        new Formulaire();
        new Router();
        this.#getTaches(); 

        document.addEventListener('ouvrirFormulaire', () => {
            this.#conteneurForm.classList.remove('non-exist');
            this.#conteneurTaches.classList.add('non-exist');
        });
        
        document.addEventListener('ouvrirTaches', () => {
            this.#conteneurForm.classList.add('non-exist');
            this.#conteneurTaches.classList.remove('non-exist');
        });
    }

    async #getTaches() {
        const reponse = await fetch("api/readTache.php");
        let taches = await reponse.json();
        taches.forEach(tache => {
            this.#aTaches.push(new Tache(tache, this.#conteneurTaches));
        });
    }
}