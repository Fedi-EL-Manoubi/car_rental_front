# 🚗 RentalCar - Application de Location de Véhicules 🚙

![Logo RentalCar]
*Insérez votre logo ici*

## 📋 Description du Projet

RentalCar est une application web développée avec Angular qui permet aux utilisateurs de louer des véhicules en ligne. L'application offre une interface utilisateur intuitive pour parcourir, rechercher et réserver des véhicules, ainsi qu'un panneau d'administration pour gérer l'inventaire des voitures disponibles.

## ✨ Fonctionnalités Principales

### 👤 Pour les Clients
- 📑 Catalogue de véhicules disponibles à la location
- 📝 Fiches détaillées pour chaque véhicule
- 📅 Système de réservation avec calendrier interactif
- 📋 Formulaire de réservation personnalisé
- 📱 Interface utilisateur responsive

### 👨‍💼 Pour les Administrateurs
- 📊 Tableau de bord de gestion des véhicules
- ➕ Ajout, modification et suppression de véhicules
- 🔧 Personnalisation complète des fiches véhicules
- 🗓️ Gestion des disponibilités

## 📸 Captures d'écran

### Page d'accueil avec liste des véhicules
![Page d'accueil]
![image](https://github.com/user-attachments/assets/e9a86879-accb-4300-be5c-32dc527b8913)


### Fiche détaillée d'un véhicule
![Fiche véhicule]
![image](https://github.com/user-attachments/assets/7c30946b-989f-4df6-9bf2-a7767be9afbd)



### Interface de réservation avec calendrier
![Système de réservation]
![image](https://github.com/user-attachments/assets/d9d242f9-e6ca-4ffe-86d1-17426b03c23e)


### Panneau d'administration
![Panneau admin]
![image](https://github.com/user-attachments/assets/890e560a-7dce-4a0e-8fd1-eaed0f633247)


## 🔧 Prérequis

- [Node.js](https://nodejs.org/) (v22.12.0 version recommandée)
- [Angular CLI](https://github.com/angular/angular-cli) (version 16)

## 🚀 Installation et configuration

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

## 📁 Structure du Projet

```
car_rental_front/
├── .angular/
├── .vscode/
├── node_modules/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── models/
│   │   ├── services/
│   │   ├── app-routing.module.ts
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── assets/
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── .editorconfig
├── .gitignore
├── angular.json
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```

## 📘 Utilisation

### 🚗 Interface Client

1. Parcourez la liste des véhicules disponibles sur la page d'accueil
2. Cliquez sur un véhicule pour voir sa fiche détaillée
3. Utilisez le calendrier pour sélectionner les dates de location
4. Remplissez le formulaire de réservation
5. Confirmez votre réservation

### 🔐 Interface Administrateur

1. Accédez au tableau de bord administrateur
2. Gérez l'inventaire des véhicules (ajout, modification, suppression)
3. Modifiez les détails de chaque véhicule (marque, modèle, image, etc.)
4. Configurez les disponibilités

## 💻 Technologies Utilisées

- [Angular](https://angular.io/) - Framework front-end
- [TypeScript](https://www.typescriptlang.org/) - Langage de programmation
- [Bootstrap](https://getbootstrap.com/) (ou autre framework CSS si applicable)
- [RxJS](https://rxjs.dev/) - Bibliothèque pour la programmation réactive

## ⌨️ Commandes Angular CLI

- Génération de composants : `ng generate component component-name`
- Construction du projet : `ng build`

Pour plus d'informations sur Angular CLI, consultez la [documentation officielle](https://angular.io/cli).

## 🤝 Contribution

Si vous souhaitez contribuer à ce projet, veuillez suivre les étapes suivantes :

1. Créez une branche (`git checkout -b feature/nomBranch`)
2. Committez vos changements (`git commit -m 'Add some nomBranch'`)
3. Poussez vers la branche (`git push origin feature/nomBranch`)
4. Ouvrez une Pull Request


## 📄 Licence
© 2025 [EL Manoubi Fedi]. Tous droits réservés.
Ce projet a été développé par [EL Manoubi Fedi] à des fins personnelles/éducatives. Toute utilisation commerciale ou redistribution sans autorisation est interdite.
Lien du projet : https://github.com/Fedi-EL-Manoubi/car_rental_front/tree/main
