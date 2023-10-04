<?php
ini_set('display_errors', 1);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    if (isset($_GET) && isset($_GET["idEquipe"])) {
        $id = $_GET["idEquipe"];
    } else {
        http_response_code("404");
        $message = array("message" => "Vous devez définir le id de l'équipe");
        echo json_encode($message);
        exit();
    }

    // *************** POUR MAMP *******************
    // ** Changez les infos de connexion en fonction de votre serveur **
    $connexion = mysqli_connect("localhost", "root", "", "ligue-async");

    if ($connexion == false) {
        // La connexion n'a pas fonctionnée
        die('Erreur de connexion à la base de données. ' . mysqli_connect_error());
    }

    $requete = "SELECT * from joueurs JOIN equipes ON joueurs.idEquipe = equipes.id WHERE idEquipe='$id'";
    $stmt = $connexion->prepare($requete);

    if ($stmt->execute()) {
        $results = $stmt->get_result();
        echo json_encode($results->fetch_all(MYSQLI_ASSOC));
        $stmt->close();

        $connexion->close();
        exit();
    }
} catch (Exception $erreur) {
    http_response_code(500);
    $message = array("message" => $erreur->getMessage());

    echo json_encode($message);
}