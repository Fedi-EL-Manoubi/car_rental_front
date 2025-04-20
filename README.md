# RentalCar - Application de Location de Véhicules

![Logo RentalCar]
*Insérez votre logo ici*

## Description du Projet

RentalCar est une application web développée avec Angular qui permet aux utilisateurs de louer des véhicules en ligne. L'application offre une interface utilisateur intuitive pour parcourir, rechercher et réserver des véhicules, ainsi qu'un panneau d'administration pour gérer l'inventaire des voitures disponibles.

## Fonctionnalités Principales

### Pour les Clients
- Catalogue de véhicules disponibles à la location
- Fiches détaillées pour chaque véhicule
- Système de réservation avec calendrier interactif
- Formulaire de réservation personnalisé
- Interface utilisateur responsive

### Pour les Administrateurs
- Tableau de bord de gestion des véhicules
- Ajout, modification et suppression de véhicules
- Personnalisation complète des fiches véhicules
- Gestion des disponibilités

## Captures d'écran

### Page d'accueil avec liste des véhicules
![Page d'accueil]
*Insérez votre capture d'écran ici*

### Fiche détaillée d'un véhicule
![Fiche véhicule]
*Insérez votre capture d'écran ici*

### Interface de réservation avec calendrier
![Système de réservation]
*Insérez votre capture d'écran ici*

### Panneau d'administration
![Panneau admin]
*Insérez votre capture d'écran ici*

## Prérequis

- [Node.js](https://nodejs.org/) (version recommandée)
- [Angular CLI](https://github.com/angular/angular-cli) (version 16)

## Installation et configuration

1. Clonez le dépôt :
```bash
git clone https://github.com/votre-username/car_rental_front.git
cd car_rental_front
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez le serveur de développement :
```bash
ng serve -o
```

L'application sera automatiquement ouverte dans votre navigateur à l'adresse `http://localhost:4200/`.

## Structure du Projet

```
car_rental_front/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── home/
│   │   │   ├── vehicle-details/
│   │   │   ├── booking-form/
│   │   │   └── admin-dashboard/
│   │   ├── services/
│   │   ├── models/
│   │   └── ...
│   ├── assets/
│   └── ...
└── ...
```

## Utilisation

### Interface Client

1. Parcourez la liste des véhicules disponibles sur la page d'accueil
2. Cliquez sur un véhicule pour voir sa fiche détaillée
3. Utilisez le calendrier pour sélectionner les dates de location
4. Remplissez le formulaire de réservation
5. Confirmez votre réservation

### Interface Administrateur

1. Accédez au tableau de bord administrateur
2. Gérez l'inventaire des véhicules (ajout, modification, suppression)
3. Modifiez les détails de chaque véhicule (marque, modèle, image, etc.)
4. Configurez les disponibilités

## Technologies Utilisées

- [Angular](https://angular.io/) - Framework front-end
- [TypeScript](https://www.typescriptlang.org/) - Langage de programmation
- [Bootstrap](https://getbootstrap.com/) (ou autre framework CSS si applicable)
- [RxJS](https://rxjs.dev/) - Bibliothèque pour la programmation réactive

## Commandes Angular CLI

- Génération de composants : `ng generate component component-name`
- Construction du projet : `ng build`
- Exécution des tests unitaires : `ng test`
- Exécution des tests end-to-end : `ng e2e`

Pour plus d'informations sur Angular CLI, consultez la [documentation officielle](https://angular.io/cli).

## Contribution

Si vous souhaitez contribuer à ce projet, veuillez suivre les étapes suivantes :

1. Créez une branche (`git checkout -b feature/AmazingFeature`)
2. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
3. Poussez vers la branche (`git push origin feature/AmazingFeature`)
4. Ouvrez une Pull Request

## Licence

Ce projet est sous licence [MIT](https://opensource.org/licenses/MIT).

## Contact

Votre Nom - [votre-email@exemple.com](mailto:votre-email@exemple.com)

Lien du projet : [https://github.com/votre-username/car_rental_front](https://github.com/votre-username/car_rental_front)
