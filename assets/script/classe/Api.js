
export default class Api{
    
    async getTaches() {
        const reponse = await fetch("api/tache/read.php");
        let taches = await reponse.json();
        return taches;
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