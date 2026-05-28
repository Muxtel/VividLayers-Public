## Commandes fréquentes
### Démarrer en mode dev
Lancer le uniquement db1 et Adminer dans le docker et faire le reste en ligne de commandes suivantes :


### Lancer backend en mode dev
(/backend)> fastapi dev

### Synchroniser (migrer) models > sql
(/backend)> alembic revision --autogenerate -m "Un nom d'état"                                                                           
(/backend)> alembic upgrade head

**Pour revenir à la version précédente :**
(/backend)> alembic downgrade -1

**Pour revenir à une version concrète :**
(/backend)> alembic downgrade <revision_id>

**Trouver une versio** : (/backend)> alembic history

### Lancer frontend en mode dev
(/frontend)> npm run dev 

### Construire les services frontend à partir des routes backend
(/frontend)> npm run generate-client

### Documentation DEV de Tiangolo
[Stack REACT/FASTAPI documentation by Tiangolo](./README-DEV-HELPER.md)