# Sockets
## Description
Il y a deux services de sockets distincs :
- La surveillance des fichiers xml ou xls avec le service des data sources.
- La surveillance des états des layers (play ou stop, par exemple)

## Erreurs fréquentes
Attention, le websocket prévient des changements. Il n'exime pas de devoir accéder à l'information AVANT.

## Abonnement au sockets côté frontend REACT

Ils sont disponibles dans le context et on y accède via useContext().

Par exemple ici on accède à tous les sockets des data source :

`const sockets = useContext(DataSocketContext)`

Puis via un useEffect on récupère le socket par l'id (ce sera l'id de l'item du model, tout simplement. Dans cet autre exemple layer.id)

```
useEffect(() => {
    if (!sockets) return
    const socket = sockets.get(button.layer.id)
    if (!socket || !button.layer) return

    socket.addEventListener("message", handleMessage)

    return () => {
      socket.removeEventListener("message", handleMessage)
    }
  }, [sockets, handleMessage, button.layer, button.layer.id])
```
Puis, traiter la réponse ou le message du socket en fonction des besoins :

```
  const handleMessage = useCallback(
    (event: MessageEvent) => {
      const layer: LayerPublic = JSON.parse(event.data)

      if (!layer.action?.name) return
      layerRef.current = layer

      if (
        layerRef.current.title?.id === button.title?.id &&
        layerRef.current.selected_data_index === button.selected_data_index
      )
        setLayerState(layer.action.name)
      else {
        setLayerState("STOP")
      }
    },
    [button.selected_data_index, button.title?.id],
  )
```

## Abonnement au websocket via un autre client par endroute API

### Layer

#### 1. Abonnement du bouton à un websocket

Il y a deux endroutes pour le ws Layer : 
- Accéder au ws d'un layer par son id `/ws/layer/{layer_id}`
- compter le nombre de ws layer. Mais cette fonctionnalité ne semble pas être utilisée pour l'instant, puisse qu'il y a pour l'instant la limitation structurelle de 4 layers par compte. `/ws/layers_count`

Voici un exteait de `/backend/app/api/routes/ws_layers.py` :

<pre>
@router.websocket("/ws/layer/{layer_id}")
async def websocket_layer(websocket: WebSocket, layer_id: int):
    active_layer_connexions.add(websocket)
    # print(f"⚠️ Connexion LAYER ouverte, total={len(active_layer_connexions)}")
    await manager.connect(websocket=websocket, model_name="Layer", item_id=layer_id)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket=websocket, model_name="Layer", item_id=layer_id)
    
    finally:
        # Retirer la connexion du set pour ne pas la garder active
        active_layer_connexions.remove(websocket)
        print(f"⚠️ Connexion de LAYER fermée, total={len(active_layer_connexions)}")
</pre>


Le callback du listener récupère le message (messageEvent en fonction des librairies propres à l'environnement) et l'information se trouve dans MessageEvent.data formaté JSON, comme dans l'exemple en REACT.


#### 2. Le Bouton infère son état depuis le websocket du layer

Chaque bouton doit inférer son état en se basant sur une combinaison de variables qui permettent de l'identifier (le bouton) sans équivoque :
- L'id du title qu'il affiche
- L'id du layer qui affiche le title
- Le selected_data_index qu'il affiche

Pour ce dernier point imaginons que nous ayons un synthé. Nous disposons d'un xml ou xls qui contient une liste de personnes. Pour un même synthé (un même title), nous avons autant de boutons que de personnes contenues dans la liste du xml. Imaginons qu'on veut afficher le synthé toujours dans le même layer (1).

- Un premier bouton (Michel) aurait une la combinaison title_id = 1, layer_id=1, selected_data_index=1
- Un deuxième bouton (Josianne) aurait une la combinaison title_id = 1, layer_id=1, selected_data_index=2
- Un troisième bouton (André) aurait une la combinaison title_id = 1, layer_id=1, selected_data_index=3

Ainsi chaque bouton doit comparer sa combinaison propre à lui-même et l'état du layer dans le websocket afin de savoir s'il doit se considérer comme actif ou pas.


Pour rappel (voir la doc du swagger http://localhost:8000/docs), un bouton qui fait "play" envoi 3 variables : `/api/v1/layer/play_on_layer/{title_id}/{layer_id}/{selected_data_index}` et reçoit comme réponse (et cette réponse est identique à celle du ws) :

<pre>

{
  "name": "string",
  "description": "string",
  "order": 1,
  "selected_data_index": 0,
  "id": 0,
  "owner_id": 0,
  "action": {
    "name": "string",
    "description": "string",
    "id": 0
  },
  "title": {
    "name": "string",
    "model": "string",
    "description": "string",
    "matrix3d": "string",
    "id": 0,
    "owner_id": 0,
    "data_source": {
      "name": "string",
      "id": 0,
      "owner_id": 0,
      "data_path": "string"
    }
  },
  "skin": {
    "name": "string",
    "description": "string",
    "id": 0,
    "owner_id": 0
  }
}

</pre>

