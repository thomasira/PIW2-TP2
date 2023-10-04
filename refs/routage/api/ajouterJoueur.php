<?php
ini_set('display_errors', 1);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$data = json_decode(file_get_contents("php://input"), true);

$nom = $data["nomFamille"];
$prenom = $data["prenom"];
$numero = $data["numero"];
$idEquipe = $data["idEquipe"];


try {
    // *************** POUR MAMP *******************
    // ** Changez les infos de connexion en fonction de votre serveur **
    $connexion = mysqli_connect("localhost", "root", "", "ligue-async");

    if ($connexion == false) {
        // La connexion n'a pas fonctionnée
        die('Erreur de connexion à la base de données. ' . mysqli_connect_error());
    }

    $requete = "INSERT INTO joueurs (nomFamille, prenom, numero, idEquipe) VALUES ('$nom','$prenom','$numero','$idEquipe')";
    $stmt = $connexion->prepare($requete);

    if ($stmt->execute()) {
        $id = $connexion->insert_id;
        $message = array("message" => "Le joueur $nom a été ajouté avec le id: $id");
        echo json_encode($message);

        $stmt->close();
        $connexion->close();
        exit();
    }
} catch (Exception $erreur) {
    http_response_code(500);
    $message = array("message" => $erreur->getMessage());

    echo json_encode($message);
}