
export default class Api{
    
    async createTache(data) {
        const dataTache = {
            nom: data.nom,
            description: data.description,
            importance: data.importance
        };
        const config = {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(dataTache),
        };
        const url = `api/tache/create.php`;
        const reponse = await fetch(url, config);
        return await reponse.json();
    }


    async getTaches() {
        const reponse = await fetch("api/tache/read.php");
        return await reponse.json();
    }

    async deleteTache(id) {
        const config = {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(id),
        };
        const url = `api/tache/delete.php`;
        const reponse = await fetch(url, config);
    }
}