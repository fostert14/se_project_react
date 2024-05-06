export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://www.fosterwtwr.crabdance.com"
    : "http://localhost:3001";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

export const getToken = () => localStorage.getItem("jwt");

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export function getItems() {
  return request(`${baseUrl}/items`);
}

export function addItem(item) {
  const token = getToken();
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  };
  return request(`${baseUrl}/items`, options);
}

export function deleteItem(id) {
  const token = getToken();
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return request(`${baseUrl}/items/${id}`, options);
}

export function addCardLike(id) {
  const token = getToken();
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function removeCardLike(id) {
  const token = getToken();
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}
