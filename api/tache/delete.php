<?php
ini_set('display_errors', 1);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$id = json_decode(file_get_contents("php://input"), true);

try {
    $connexion = mysqli_connect("localhost", "root", "12345678", "to-do-list");

    if (!$connexion) {
        // La connexion n'a pas fonctionnée
        die('Erreur de connexion à la base de données. ' . mysqli_connect_error());
    }

    $requete = "DELETE FROM tache WHERE id = $id";

    $stmt = $connexion->prepare($requete);

    if ($stmt->execute()) {
        echo json_encode($id); 

        $stmt->close();
        $connexion->close();
        exit();
    }
} catch (Exception $erreur) {
    http_response_code(500);
    $message = array("message" => $erreur->getMessage());

    echo json_encode($message);
}