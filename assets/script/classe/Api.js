
export default class Api{
    
    /**
     * créer une tâche dans la DB avec la donnée passé en param venant du formulaire
     * 
     * @param {*} data -> données recueillies du formulaire
     */
    async createTache(data) {
        const dataTache = {
            tache: data.tache,
            description: data.description,
            importance: data.importance
        };
        const config = {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(dataTache),
        };
        const url = 'api/tache/create.php';

        const reponse = await fetch(url, config);
        return await reponse.json();
    }

    /**
     * supprimer une entrée de la DB
     * 
     * @param {*} id -> id de la tâche à supprimer
     */
    async deleteTache(id) {
        const config = {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(id),
        };
        const url = 'api/tache/delete.php';
        const reponse = await fetch(url, config);
    }
    
    /**
     * chercher les tâches de la DB avec une option de classement
     * 
     * @param {*} option -> option de classement
     * @returns -> un fichier json contenant les objets(rangées) retournées de la DB
     */
    async getTaches(option) {
        let config = null;
        if(option) {
            config = {
                method: 'post',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(option),
            };
        }
        const url = 'api/tache/read.php';
        const reponse = await fetch(url, config);
        return await reponse.json();
    }

    /**
     * DEMO - SERT D'EXEMPLE POUR UNE REQUETE API PAR ID
     * 
     * @param {*} id -> id de la tâche cible
     * @returns -> un fichier json contenant l'objet(rangée) retournée de la DB
     */
    async getTacheId(id) {
        const url = 'api/tache/readId.php';
        const config = {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(id),
        };
        const reponse = await fetch(url, config);
        return await reponse.json();
    }
}