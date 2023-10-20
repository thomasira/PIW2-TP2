
# Projet gestionnaire de tâches | PIW2-TP2

Thomas Aucoin-Lo  
e2395387

## Index

* [Résumé](#résumé)
* [HTML](#sur-la-structure-html)
* [JS | architecture](#sur-larchitecture-js)
* [JS | classes](#sur-les-classes-js)
* [Routage](#sur-le-routage)
* [CSS](#sur-la-structure-css)

## Résumé

Le projet consiste en une mono-page web servant à gérer des tâches, soit en ajouter via un formulaire,
les consulter, les supprimer et les classer.
Un routeur est employé afin d'afficher le formulaire, les tâches ou encore une tâche et son détail. 
Une base de donnée est employé pour storer les données(tâches).

## Sur la structure HTML

Ce projet emploie un HTML déconstruit importé via un script JS. Le fichier index.html contient trois sections conteneurs où est importé le contenu, soit le formulaire, les tâches et la boîte détail d'une tâche.

### snippets

* #### [formulaire](./snippets/formulaire.html)

* #### [tache](./snippets/tache.html)

* #### [detail](./snippets/detail.html)


## Sur l'architecture JS

Le projet est conçu en orienté objet et intègre la majorité des apprentissages vus en classe.

> * classes et méthodes (privés/publics)
> * événements personnalisées
> * instance de classe
> * routage
> * import et module
> * api fetch PHP, liens DB
> * promesses
> * méthodes de tableau d'objet (find, filter, ...)

Un script **main** est éxecuté et instancie le **gestionnaire de tâche**. Ce dernier gère toutes les fonctionnalitées du projet. Il instancie la majorité des classes et appele leurs méthodes au besoin et il gère les requêtes et réponses api vers la DB.   
**pour plus de détails voir [JS | classes](#sur-les-classes-js)*

## Sur les classes JS

* [Gestionnaire de tâche](#gestionnaire-de-tâche)
* [Formulaire](#formulaire-1)
* [Tâche](#tâche)
* [Router](#router)
* [Détail de tâche](#detail-tâche)
* [Api](#api)
* [Validateur](#validateur)


> #### [Gestionnaire de tâche](assets/script/classe/GestionnaireTache.js)
> Toutes les actions(sauf la validation des données) passent par le gestionnaire de tâche. Bien qu'il serait possible d'outre passer le gestionnaire dans certains cas. Cette méthode permet de s'assurer que toutes les fonctionnalitées pour une action précise soit effectuées(routage, affichage, api, etc.). 
> * instancie toutes les classes requises
> * gère l'affichage des pages
> * gère les événements persos
> * etc.

> #### [Formulaire](assets/script/classe/Formulaire.js)
> La classe formulaire se charge de valider les entrées du formulaire et toutes les autres fonctionnalitées directement liées au formulaire.
> * NE gère pas son affichage
> * NE gère pas l'envoi des données à l'API
> * gère l'affichage des erreurs
> * gère son bouton
> * instancie le Validateur
> * appelle le GP lorsque la donnée est validée

> #### [Tâche](./assets/script/classe/Tache.js)
> La classe Tâche se charge d'enregistrer les données d'une tâche, de cloner un snippet HTML et de l'injecter dans son conteneur parent au besoin.
> * gère les infos d'une tâche
> * gère son élément HTML
> * gère ses boutons

> #### [Router](./assets/script/classe/Router.js)
> Le Router se charge d'aiguiller toutes les requêtes url en appelant les méthodes du GP
> * gère les appels externes du GT
> * gère l'objet history 
> * gère tout le routage

> #### [Detail tâche](./assets/script/classe/DetailTache.js)
> La classe DetailTache se charge de cloner un snippet HTML et d'insérer le détail d'une tâche pour ensuite l'injecter dans son conteneur parent.
> * NE gère pas son affichage
> * gère son bouton

> #### [API](./assets/script/classe/API.js)
> La classe API est en réalité une extension du gestionnaire de tâche. Elle compartimente toute les actions vers les fichiers api. Toutes ses méthodes sont publiques afin d'être appelées à la convenance du GT.

> #### [Validateur](./assets/script/classe/Validateur.js)
> La classe Validateur est la seule qui n'est pas instanciée par le GT. Elle agit seulement dans la validation des données formulaire et donc est instanciée par la classe Formulaire.
> * renvoit un objet Error pouvant être utilisé dans l'affichage des erreurs


## Sur le routage

La plupart des éléments déclencheurs du projet envoie un alerte au GT qui se charge d'appeler le routeur.
À cette fin et pour conserver les méthodes de fonctionnalitées privées, une méthode intermédiaire publique est utilisé. Elle se charge de modifier l'objet History et d'appeler ses méthodes privées selon le paramètre. 

## Sur la structure CSS

Désolé pour l'afflux de transition et de couleurs. j'ai voulu m'amuser dans un style différent et j'ai pousser un peu trop. Cela ma parcontre permis de tester la technique du **& element{}** qui fût particulièrement pratique pour les double hover.