const baseUrl = "http://localhost:3001";

export function getItems() {
  return fetch(`${baseUrl}/items`).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Error ${response.status}`);
  });
}

export function addItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Error ${response.status}`);
  });
}

export function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Error ${response.status}`);
  });
}
