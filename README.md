# Youtube Library API
Pour réaliser cette application j'ai utilisé create-react-app, ainsi que le template Redux Toolkit.

## Mode d'emploi
- Cloner le projet
- Dans le dossier du projet cloné, exécuter la commande ```npm install```
- Faire une copie du fichier ".env copy", le renommer ".env", et y ajouter la clé API Google pour pouvoir rechercher des vidéos depuis Youtube, ainsi que le token JWT de l'application back, pour pouvoir récupérer les vidéos de l'utilisateur, en ajouter et les supprimer.
- Exécuter ```npm start``` pour lancer l'application.
- Ajouter à l'url "?userId=x", x à remplacer l'id de l'utilisateur dont vous souhaitez gérer la bibliothèque.