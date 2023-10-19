
# Projet gestionnaire de tâches | PIW2-TP2

Thomas Aucoin-Lo  
e2395387

## Index

* [Résumé](#résumé)
* [HTML](#sur-la-structure-html)
* [JS | architecture](#sur-larchitecture-js)
* [JS | classes](#sur-les-classes-js)
* [Routage](#sur-le-routage)


## todo
classer up and down
recherche par nom ou id

## Résumé

Le projet consiste en une mono-page web servant à gérér des tâches, soit en ajouter via un formulaire,
les consulter, les supprimer et les classer.
Un routeur est employé afin d'afficher le formulaire, les tâches ou encore une tâche et son détail. 
Une base de donnée est employé pour storer les données(tâches).

## Sur la structure HTML

Ce projet emploie un HTML déconstruit importé via un script JS. Le fichier index.html contient trois sections conteneurs où sont importé le contenu, soit le formulaire, la boîte de tâches et la boîte détail d'une tâche.

### snippets

#### [formulaire](./snippets/formulaire.html)

contient:
* champ nom
* champ description
* champ importance
* bouton ajouter
* spans sur chaque champ pour la gestion d'erreurss

## Sur les classes JS

## Sur l'architecture JS

Le projet est conçu en orienté objet et intègre la majorité des apprentissages vus en classe.

> * classes et méthodes (privés/publics)
> * événements personnalisées
> * instance de classe
> * routage
> * import et module
> * api fetch PHP, liens DB
> * promesses
> * plus encore

Un script **main** est éxecuté et instancie le **gestionnaire de tâche**. Ce dernier gère toutes les fonctionnalitées du projet. Il instancie la majorité des classes et appele leurs méthodes au besoin et il gère les requêtes et réponses api vers la DB.   
**pour plus de détails voir [JS | classes](#sur-les-classes-js)*

## Sur le routage

