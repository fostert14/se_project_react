const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export function getItems() {
  return request(`${baseUrl}/items`);
}

export function addItem(item) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  };
  return request(`${baseUrl}/items`, options);
}

export function deleteItem(id) {
  const options = {
    method: "DELETE",
  };
  return request(`${baseUrl}/items/${id}`, options);
}
