import Router from "./Router.js";

export default class GestionnaireLigue {
    #conteneur;

    constructor() {
        this.#conteneur = document.querySelector("main");
        this.#init();
        this.routeur = new Router();
    }

    #init() {
        if (GestionnaireLigue.instance == null) {
            GestionnaireLigue.instance = this;
        } else {
            throw new Error("Impossible de créer un deuxième gestionnaire de ligue");
        }

        this.#conteneur.addEventListener(
            "submit",
            function (evenement) {
                evenement.preventDefault();

                if (evenement.target.closest("[data-form]")) {
                    this.gererFormulaire(evenement.target);
                }
            }.bind(this)
        );
    }

    accueil() {
        this.#conteneur.innerHTML = "";
    }

    async getEquipes() {
        try {
            const url = "api/getEquipes.php";
            const reponse = await fetch(url);
            const equipes = await reponse.json();

            if (equipes.length > 0) {
                let listeElements = "";

                equipes.forEach((equipe) => {
                    listeElements += `<li class="underline" data-equipe="${equipe.id}">${equipe.nom} de ${equipe.quartier}</li>`;
                });

                const html = `
                    <h3>Équipes</h3>
                    <ul>   
                        ${listeElements}
                    </ul>`;

                this.#conteneur.innerHTML = html;
            } else {
                this.#conteneur.innerHTML = "<p>Aucune équipe trouvée dans la base de données</p>";
            }
        } catch (erreur) {
            this.accueil();
        }
    }

    async getJoueursParEquipe(idEquipe) {
        try {
            const url = `api/getJoueursParEquipe.php?idEquipe=${idEquipe}`;
            const reponse = await fetch(url);
            const joueurs = await reponse.json();

            if (joueurs.length > 0) {
                let listeElements = "";

                joueurs.forEach((joueur) => {
                    listeElements += `<li data-player="${joueur.id}">${joueur.numero} : ${joueur.prenom} ${joueur.nomFamille}</li>`;
                });

                const html = `
                    <h3>${joueurs[0].nom} de ${joueurs[0].quartier}</h3>
                    <ul>   
                        ${listeElements}
                    </ul>`;

                this.#conteneur.innerHTML = html;
            } else {
                this.#conteneur.innerHTML = "<p>Cette équipe n'a aucun joueur</p>";
            }
        } catch (erreur) {
            this.accueil();
        }
    }

    async ajouterJoueur() {
        const url = "api/getEquipes.php";
        const reponse = await fetch(url);
        const equipes = await reponse.json();

        let html = `<form data-form="ajoute joueur">
                            <h3>Ajouter un joueur</h3>
                            <div>
                                <select name="idEquipe">
                                    <option value="0">Veuillez sélectionner une équipe</option>
                                    ${equipes.map(function (equipe) {
                                        return `<option value="${equipe.id}">${equipe.nom} de ${equipe.quartier}</option>`;
                                    })}
                                </select>
                            </div>

                            <div>
                                <label for="prenom">Prénom : </label>
                                <input type="text" id="prenom" name="prenom">
                            </div>

                            <div>
                                <label for="nom">Nom : </label>
                                <input type="text" id="nom" name="nomFamille">
                            </div>

                            <div>
                                <label for="numero">Numéro : </label>
                                <input type="number" id="numero" name="numero">
                            </div>

                            <div>
                                <button>Soumettre</button>
                            </div>
                        </form>`;

        this.#conteneur.innerHTML = html;
    }

    async gererFormulaire(form) {
        const { idEquipe, nomFamille, prenom, numero } = form;

        const donneesJoueur = {
            idEquipe: idEquipe.value,
            nomFamille: nomFamille.value,
            prenom: prenom.value,
            numero: numero.value,
        };

        const config = {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(donneesJoueur),
        };

        const url = `api/ajouterJoueur.php`;

        const reponse = await fetch(url, config);
        const message = await reponse.json();
        form.reset();
    }
}
