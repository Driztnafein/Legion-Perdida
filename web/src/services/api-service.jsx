import axios from 'axios';

const service = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.REACT_APP_BASE_API_URL || "http://localhost:3000/v1",
});

export function create(body) {
  const formData = new FormData();

  formData.append("name", body.name);
  formData.append("email", body.email);
  formData.append("password", body.password);

  if (body.avatar) {
    formData.append("avatar", body.avatar[0]);
  }

  return service.post("/users", formData);
}

export function login(data) {
  return service.post("/users/login", data);
}

export function logout() {
  return service.post("/users/logout");
}

export function list() {
  return service.get("/games");
}




