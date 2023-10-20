
export default class Validateur{

    constructor() {
        this.error;
        if (Validateur.instance == null) Validateur.instance = this;
        else throw new Error("Impossible de créer un deuxième validateur");
    }

    /**
     * valider le champ description
     * 
     * @param {*} $description -> du formulaire
     */
    #validerDescription($description) {
        if($description.length > 200) this.error["description"] = "SVP ne pas dépasser 200 caractères";
    }

    /**
     * valider le champ description
     * 
     * @param {*} $importance -> du formulaire
     */
    #validerImportance($importance) {
        if($importance == null || $importance == "") this.error["importance"] = "Ce champs est requis";
    }

    /**
     * valider nom
     * 
     * @param {*} $nom -> du formulaire 
     */
    #validerNom($nom) {
        if($nom.length < 3) this.error["nom"] = "Un minimum de 3 caractères est requis";
        if($nom == "") this.error["nom"] = "Ce champs est requis";
        if($nom.length > 45) this.error["nom"] = "SVP ne pas dépasser 45 caractères";
    }
    
    /**
     * valider tous les champs et renvoyer l'objet erreur si n'est pas vide
     * 
     * @param {*} $data -> les entrées du formulaire
     * @returns this.error
     */
    validerTout($data) {
        this.error = [];
        this.#validerNom($data.nom.value);
        this.#validerDescription($data.description.value);
        this.#validerImportance($data.importance.value);

        if(Object.keys(this.error).length == 0) return false;
        else return this.error;
    }
}