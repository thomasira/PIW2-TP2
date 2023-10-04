
class Tache{
    constructor(obj){
        this._obj = obj;


        this._el = `<div class="tache"><p><small>Tâche: </small>${this._obj.nom} <small>-${this._obj.importance}</small></p><button data-js-afficher>Afficher le détail</button><button data-js-supprimer>Supprimer</button></div>`;

/* 
        this._afficher = this._dom.querySelector('[data-js-afficher]');
        this._supprimer = this._dom.querySelector('[data-js-suprrimer]'); */

    }
    

}