const BASE_URL = "http://localhost:3001";

export const register = ({ name, email, password, avatar }) => {
  return (fetch(`${BASE_URL}/signup`),
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Registration failed");
    }
    return res.json();
  });
};
