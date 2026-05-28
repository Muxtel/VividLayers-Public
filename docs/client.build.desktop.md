# Desktop build du frontend VividLayers Client

## Erreurs fréquentes
- ⚠️ Ne pas accepter les corrections de EsLint concernant les dépendences des useEffect().

## Lancement d'un build pour distribution de la version Desktop (*.exe pour windows)

Avant toute chose, incrémenter la version dans [../frontend/package.json](../frontend/package.json)

Puis lancer `npm run dist`

Si des erreurs surgissent, penser à passer un coup de ESLint en utilisant `npm run lint`, mais attention ⚠️ à ne pas changer les dépendences des divers useEffect() même si ESLint le propose.

Pour tester en mode dev ce que ça va donner sans lancer le build complet :
`npx ./node_modules/electron/dist/electron.exe ./electron/main.js`


## Principe

Le builder pour la distribution Desktop est **electron** et **electron-builder**

Ci ce n'est pas installé, suivre les [consignes d'installation du framework electron](#installation-delectron-et-configuration-delectron)

Le code concerné par le electron-builder est dans le fichier ``/frontend/package.json``

Pour l'instant on y trouve ceci :

```
  "build": {
    "appId": "com.vividlayers.desktop",
    "productName": "VividLayers",
    "electronVersion": "38.1.0",    "directories": {
      "output": "desktop-build/${version}"
    },
    "files": [
      "dist/**/*",
      "electron/main.js"
    ],
    "win": {
      "target": "nsis",
      "artifactName": "VividLayers-Setup-${version}.${ext}"
    }
  },
```

Mais ça va peut-être changer sensiblement, car je voudrai y intégrer le fait que lorsqu'on lance le client desktop (le frontend) le serveur vienne avec. Je ne sais pas encore par quoi ça va se traduire.


Une fois le build lancé, la version distribuable se trouve dans `/frontend/desktop-build/${version}`

Electron va créer une version **win-unpacked** et le fichier distribuable **VividLayersClient Setup x.x.x.exe**. C'est ce dernier qui est prêt à distribuer, c'est l'installateur.

Dans `/frontend/desktop-build/win-unpacked/resources/app.asar` on trouve tout ce qui est embarqué dans l'application.
En cas de problème, ou si on veut vérifier ce qui a été embarqué, on peut naviguer dedans en utilisant asar comme ceci :

**Lister tout ce qu'il y a dans app.asar** 
(il faut installer asar `npm install -g asar`, je ne sais pas pourquoi il n'est pas dans devDependencies de package.json)**:
`npx asar list desktop-build/win-unpacked/resources/app.asar`

**ou chercher main.js par exemple** :
`npx asar list desktop-build/win-unpacked/resources/app.asar | Select.String main.js`



## Installation d'Electron et configuration d'Electron

Normalement cette dépendence est renseignée dans package.json, donc il n'y aurait théoriquement aucun besoin de l'installer ni de le configurer. Tout est dans git. Mais au cas où voici ce qu'il faut savoir.

### Installation

`npm install --save-dev electron-builder`
`npm install --save-dev electron`


### Configuration

/frontend/electron/main.js :

```
import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  // En dev -> Vite server
  if (!app.isPackaged) {
    win.loadURL('http://localhost:5173');
  } else {
    // En prod -> fichiers packagés
    win.loadFile(path.join(__dirname, 'dist/index.html'));
  }
}

app.whenReady().then(createWindow);
```
