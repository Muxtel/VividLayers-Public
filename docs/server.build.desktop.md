# Desktop build VividLayers Server - API + Display

## Build et release automatique
0. Vérifier le dernier tag créé `git tag`
1. A la racine `git tag x.x.x-x.x.x` où le premier block est la version du serveur et le deuxième celle du client.
2. A la racine `git push origin x.x.x-x.x.x`
3. La release est dans github (compter 15 minutes)

## Lancement du build en mode manuel

0. Etre sûr qu'on a bien créé le dist du display (../backend/display/npm run dist) 
1. Incrémenter la version dans [/backend/build.py](../backend/build.py)
2. S'assurer qu'on a bien vidé la bd, càd, supprimé tous les users. Remplacer app.db par app-empty.db et renommer [/backend/data/](../backend/data/) 
3. Arrêter l'API pour libérer app.db, être sûr qu'aucune occurence de VividLayersServer ne tourne en tâche de fond.
4. Vérifier qu'on est bien sur une version locale dans [/backend/app/core/config.py](../backend/app/core/config.py)
5. Lancer le script `/backend/python build.py`
EN OPTION :
6. Faire le build client
7. Commiter la version, client+serveur
8. Créer un release client+version

Après le build, l'application distribuable se trouve dans `/backend/installer/`.
C'est le dossier `VividLayersServer` complet qu'il faut distribuer ; il n'y a **pas** d'installateur. Pour l'instant.

## Installation
Comme on a besoin des droits en écriture pour le fichier app.db embarqué, si place la distribution dans c:\programme files\ on aura besoin d'executer le programme en mode Administrateur.


## Principe

On utilise **pyintaller** pour faire le build. La bibliothèque est déjà incluse dans requirements.txt.