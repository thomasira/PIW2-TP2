import { Router } from "./Router.js";

export default class GestionnaireTache{
    #conteneurForm;
    #conteneurTaches;
    #aTaches;

    constructor() {
        if (GestionnaireTache.instance == null) GestionnaireTache.instance = this;
        else throw new Error("Impossible de créer un deuxième gestionnaire de tâche");
    
        this.#conteneurForm = document.querySelector('[data-js-page="form"]');
        this.#conteneurTaches = document.querySelector('[data-js-page="taches"]');
        this.#aTaches = [];

        this.#init();
    }

    #init() {

        this.#conteneurForm.classList.add('non-exist');
        this.#testRead();
        new Router();

        this.#conteneurForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.#gererFormulaire(e.target);
            });
    }

    async #gererFormulaire(form) {

        console.log('form');

        const dataTache = {
            nom:form.nom.value,
            description: form.description.value,
            importance: form.importance.value
        };
        const config = {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(dataTache),
        };

        const url = `api/createTache.php`;

        const reponse = await fetch(url, config);
        const message = await reponse.json();
        form.reset();
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
        const elBox = this.#conteneurTaches.querySelector('[data-js-box="taches"]');
        const reponse = await fetch("snippets/tache.html");
        let elTache = await reponse.text();
        elTache = elTache.replaceAll("{{ tache }}", tache.nom);
        elTache = elTache.replaceAll("{{ importance }}", tache.importance)
        elBox.insertAdjacentHTML('beforeend', elTache)
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