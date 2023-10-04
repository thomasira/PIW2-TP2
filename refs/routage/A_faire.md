# Exercice 3 - Routage

## Objectifs

Créer une application mono-page régissant un système de routage en JavaScript. Les fonctionnalités liées à la base de données sont déjà faites pour vous. Vous devez seulement gérer l'affichage des sections de la page.

## Étapes

1. Vous n'avez pas à modifier le fichier GestionnaireLigue.js. Il s'agit de la classe principale. Elle contient les méthodes permettant de gérer l'affichage des ligues et les équipes et les appels à la base de données. Vous devez travailler dans le fichier `Router.js`;
2. Au chargement de la page, récupérez les liens de la navigation. Récupérez la valeur de l'attribut data-href de chaque lien. Redirigez l'utilisateur vers la page correspondante.
3. Au chargement de la page, ajoutez un écouteur d'événement sur le click de la balise Main. Si l'élément cliqué contient l'attribut data-equipe, redirigez l'utilisateur vers la page correspondante. Ex: #equipe/1
4. Au changement du hash de l'url, décortiquez l'url pour savoir quelle page afficher et appelez la function correspondante dans l'objet routes du constructeur. Utilisez la méthode split des tableaux pour décortiquer l'url. Ex: #equipe/1 => ["equipe", "1"]
5. Si aucune route n'existe, appelez la méthode `accueil` de l'objet `routes`.
6. N'oubliez pas les binds pour les fonctions appelées dans les écouteurs d'événements.
7. Nettoyez et commentez votre code.

## Notes

L'exercice compte pour 5% de la note finale.

## À noter

Si vous utilisez un autre serveur que MAMP, vous devez ouvrir les fichiers dans le dossier API et changer les informations de connexion à la base de données.
