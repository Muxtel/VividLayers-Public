# Animations

## Utilisation
VividLayers intègre nativement la bibliothèque [Animate.css](https://animate.style/)

Il s'agit d'une bibliothèque exclusivement CSS afin d'éviter tout conflit JS.

Pour l'utiliser il suffit de choisir les effets d'entrée et de sortie voulus en consultant la liste du le site, copier son nom et le coller dans le paramètre d'entrée "anim-in" et le paramètre de sortie "anim-out" comme dans cet exemple :

`<div class="hiria animate__animated" anim-in="animate__fadeIn" anim-out="animate__fadeOut">`

⚠️ Je dois vérifier, mais à priori il n'y a plus besoin d'ajouter la classe "animate__animated" à l'élément que l'on veut animer. Normalement VividLayers le fait tout seul.

## Cas particulier de l'effet Reveal

'Reveal' est un effet très utilisé en habillages TV, et malheureusement il est absent de la bibliothèque animate.

J'ai proposé aux développeur d'implémenter collaborativement une extension de cet effet dans leur repo. J'attends une réponse. Je voudrais qu'elle soit intégrée à leur 'npm' et pour se faire j'ai créé un fork et prépare un pull request.

En attendant, l'extension l'effet est ici `/backend/display/src/assets/animate-extension.css` 

Pour l'instant je n'ai fait que `revealInLeft` et `revealOutLeft`. Je dois encore faire les déclinaisons en Top, Bottom et Right

## Installation et mise à jour

Voir la doc du site, mais tout se passe par npm.
Comme pour l'instant j'ai impllémenté nativement une extension dans le react embarqué de display, les mises à jour n'auront pas d'incidences sur l'extension.
