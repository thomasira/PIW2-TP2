<?php
ini_set('display_errors', 1);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$data = json_decode(file_get_contents("php://input"), true);

$tache = ltrim($data["tache"]);
$description = $data["description"];
$importance = $data["importance"];
if($description == null) $description = "null";

try {

    /* $connexion = mysqli_connect("localhost", "root", "12345678", "e2395387"); */

    $connexion = mysqli_connect("localhost", "root", "12345678", "to-do-list");

    if (!$connexion) {
        // La connexion n'a pas fonctionnée
        die('Erreur de connexion à la base de données. ' . mysqli_connect_error());
    }

    $tache = mysqli_real_escape_string($connexion, $tache);
    $description = mysqli_real_escape_string($connexion, $description);
    $requete = "INSERT INTO tache (tache, description, importance) VALUES ('$tache', '$description', '$importance');";


    $stmt = $connexion->prepare($requete);
    if ($stmt->execute()) {
        $results = $stmt->insert_id;

        $stmt->close();
        $connexion->close();
        echo $results;
    }
} catch (Exception $erreur) {
    http_response_code(500);
    $message = array("message" => $erreur->getMessage());

    echo json_encode($message);
}