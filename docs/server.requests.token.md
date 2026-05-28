# Requests et tokens

## Principe

1. On demande au serveur un token avec le couple login/pass
2. On stocke le token dans la session active
3. On adjoint le token dans le header de tous les requests

## Durée de vie du token d'authentification

Le token est configuré dans le fichier `/backend/app/core/config.py`
Sa durée de vie par défaut est de 8 jours.
Ca se passe dans la ligne qui contien :

`ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8`

## Exemple pour un client python

### Demande du token
<pre>
import requests

API_URL = "http://localhost:8000"

def login(username, password):
    response = requests.post(
        f"{API_URL}/login",
        data={
            "username": username,
            "password": password
        }
    )
    
    if response.status_code == 200:
        return response.json()["access_token"]
    else:
        raise Exception("Authentication failed")

</pre>

### Stockage dnas un exemple streamlit

<pre>
import streamlit as st

if "token" not in st.session_state:
    st.session_state.token = None

st.session_state.token = login("iban", "secret")
</pre>

### Request

Methode
<pre>
auth_request = lambda method, endpoint, **kwargs: requests.request(
    method,
    f"{API_URL}{endpoint}",
    headers={
        "Authorization": f"Bearer {token}"
    },
    **kwargs
)
</pre>

Utilisation

<pre>
response = auth_request("GET", "/protected")
print(response.json())
</pre>


## Exemple pour un client Vanila

### Demande du token

<pre>
async function login(username, password) {
  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      username,
      password
    })
  });

  const data = await response.json();
  return data.access_token;
}

</pre>


### Stocker le token dans la session

<pre>
let token = null;

login("iban", "secret").then(t => {
  sessionStorage.setItem("token", token);
});

</pre>


### Request authentifiée

<pre>
function authFetch(endpoint, options = {}) {
  return fetch(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: "Bearer " + token
    }
  });
}
</pre>

Uitilisation

<pre>
authFetch("/protected")
  .then(res => res.json())
  .then(data => console.log(data));

</pre>