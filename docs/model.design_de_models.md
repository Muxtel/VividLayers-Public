# Design de models

## Emplacement des models

`/User/{username}/Documents/VividLayers/models`

## Emplacement des assets (photos, logos etc...) utilisés par un "model"

`/User/{username}/Documents/VividLayers/assets/{nom du dossier souhaité}`

{nom du dossier souhaité} par exemple : photos, logos etc...


## Créer des "models" personnalisés en mode codage (simple HTML/CSS)  ou (advanced HTML/CSS/JS)

L'objectif premier de VividLayers était d'offrir à des concepteurs de titrages, avec un niveau *junior* de codage HTML/CSS, une entière liberté de création, grâce aux possibilités infinie qu'offre ce langage et de disposer de blibiothèques d'animation bien plus riches que ce qu'offrent nativement **vMix** et **OBS**.



- Faire une copie du dossier `emptyCustomTitle` dans `/Users/XXXX/Documents/VividLayers/models` et le renommer.
- Editer les fichiers `index.html` en suivant les recommandations suivantes :
    - Créer autant de `<div />` containers avec un id unique (⚠️)
    - Dans la div container, créer autant d'éléments `<template />` que de type de données à afficher. ⚠️ ATTENTION chaque template doit avoir un ID unique.
    - Via Client (ou swagger ou ton propre client) attribuer un `xpath` à la template dans la base donnée, pour définir l'xpath qui va restituer les items de données liées à la template.
        - Pour un fichier data source XML un xpath normal suffit. 
        - Pour un fichier data source XLS 
            - avec un seul onglet `xpath="//row"`
            - avec plusieurs onglets `xpath="//*[@name="{nom de l'onglet}"]/row"`
        - Par exemple `//Equipe` pour accèder aux la balises Equipes dun un code comme ceci :
            ```
            <Equipes>
                <Equipe>
                    <Maillot>#ff0022</Maillot>
                    <Score>1</Score>
                </Equipe>
                <Equipe>
                    <Maillot>#1010D7FF</Maillot>
                    <Score>1</Score>
                </Equipe>
            </Equipes>
            ```
    - définir le nom de la donnée enfant via les paramètres suivants :
        - `vl-bgcolor` pour la couleur de fond. Par exemple `<div vl-bgcolor="Maillot">/<div>`
        - `vl-content` pour la valeur qui doit être insérée dans la template. Par exemple `<div vl-content="Score" ></div>`
        - `vl-image` pour la valeur qui doit être insérée dans la template. Par exemple `<div vl-image="Photo" ></div>`
        - `vl-node` pour binder récursivement les trois précédentes à partir d'un node parent. Par exemple `<div vl-node="Equipes" ><template (....)></template></div>`. Ceci implique donc de placer un élément <template> pour le bind
    - définir les classes animation d'entrée et de sortie en utilisant les attributs `anim-in` et `anim-out` dans les éléments html que l'on veut animer, parmis les classes suivantes : [https://animate.style/](https://animate.style/)

    - Par exemple pour un data source XML :
        ```
        <div id="quiniela-score-bug" class="animate__animated" anim-in="animate__lightSpeedInLeft" anim-out="animate__lightSpeedOutLeft">
            <template id="template-score" container-id="quiniela-score-bug" xpath="//Equipes">
                <div class="equipe animate__animated" anim-in="animate__fadeIn" anim-out="animate__fadeOut">
                    <div class="maillot" vl-bgcolor="Maillot"></div>
                    <div class="score" vl-content="Score"></div>
                </div>
            </template>
        </div>
        ```
- Editer `title.css` comme souhaité
- Si besoin d'un traitement spécifique (rarement) créer un script libre dans title.js
- Editer selon besoin le contenu de la, ou des skins.
- Ajouter à la base de données le nouveau "title" via l'application *cliente* ou via le *swagger* dans [http://localhost:8000/docs](http://localhost:8000/docs) 


## Custom js code

Il est possible d'intégrer du js spécifique à chaque 'model'.
On peut donc modifier le fichier title.js pour controler le comportement du titrage.

Pour avoir accès aux éléments du shadow ( le model injecté dans 'display') il faut utiliser l'objet shadow et maintenir le code comme ceci :

<pre>

(function(shadow) {

    const customFunction = () => {
        // use shadow to get titles elements
        // for example
        // const container = shadow.querySelector("#container"); 
    }
    customFunction();

    // Observe mutations pour reconstruire le chart si le contenu change
    const observer = new MutationObserver(customFunction);
    observer.observe(shadow, { childList: true, subtree: true });
})(shadow);

</pre>

