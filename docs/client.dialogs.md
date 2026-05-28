# Dialogs

Ceci ne concerne que le frontend.

## Utilisation

Il y a une bibliothèque toute prête dans cet environnement, mais elle est assez pénible à utiliser, car il faut importer chaque élément un par un. 

Il vaut mieux utiliser Dialog de chakra/ui dont la doc est ici : https://chakra-ui.com/docs/components/dialog

Pour qu'un bouton qui lance un "dialog" il faut que ce bouton soit un child du dialog, concrètement dans le DialogTrigger.

Donc il faut penser le boutton et le dialog comme une seule entité. Ce qui veut dire que le bouton qui lance le dialog et le dialog sont un composant qui ressemble à quelque chose comme ça :

```
<Dialog.Root>
    <Dialog.Trigger asChild>
        <IconButton onClick={()=>{}}>
            <FaEye />
        </IconButton>
    </Dialog.Trigger>
    <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
        <Dialog.Content>
            <Dialog.Header>
            <Dialog.Title>Dialog Title</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            </Dialog.Body>
            <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
            </Dialog.ActionTrigger>
            <Button>Save</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
            </Dialog.CloseTrigger>
        </Dialog.Content>
        </Dialog.Positioner>
    </Portal>
</Dialog.Root>

```
