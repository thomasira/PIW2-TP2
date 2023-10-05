
export default class Validateur{
    
    constructor() {
        this.error = [];
        if (Validateur.instance == null) Validateur.instance = this;
        else throw new Error("Impossible de créer un deuxième validateur");
    }

    static validerTout($data) {
        this.#validerNom($data["nom"]);
        this.#validerDescription($data["description"]);
        this.#validerImportance($data["importance"]);

        if(this.error.length == 0) return true;
    }

    #validerDescription($description) {
        if($description != null) {
            if($description.length > 200) this.error["description"] = "SVP ne pas dépasser 200 caractères";
        } 
    }

    #validerImportance($importance) {
        if($importance == null) this.error["importance"] = "Ce champs est requis";

    }

    #validerNom($nom) {
        if($nom == null) this.error["nom"] = "Ce champs est requis";
        if($nom.length > 45) this.error["nom"] = "SVP ne pas dépasser 45 caractères";
        if($nom.length < 3) this.error["nom"] = "Un minimum de 3 caractères est requis";
    }
}