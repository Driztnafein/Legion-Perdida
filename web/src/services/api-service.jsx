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

export function getUserDetail(userId) {
  return service.get(`/users/${userId}`);
}

export function listUsers() {
  return service.get("/users");
}

export function updateUser(userId, updateData) {
  const formData = new FormData();
  for (const key in updateData) {
    formData.append(key, updateData[key]);
  }
  return service.patch(`/users/${userId}`, formData);
}

export function deleteUser(userId) {
  return service.delete(`/users/${userId}`);
}


export function createGame(gameData) {
  return service.post("/game", gameData);
}

export function list() {
  return service.get("/game");
}

export function detail(id) {
  return service.get(`/game/${id}`);
}

export function updateGame(gameId, updateData) {
  return service.patch(`/game/${gameId}`, updateData);
}

export function deleteGame(gameId) {
  return service.delete(`/game/${gameId}`);
}


export function createReservation(reservationData) {
  return service.post("/reservation", reservationData);
}

export function listReservations() {
  return service.get("/reservation");
}

export function getReservationDetail(id) {
  return service.get(`/reservation/${id}`);
}

export function updateReservation(id, updateData) {
  return service.patch(`/reservations/${id}`, updateData);
}

export function deleteReservation(id) {
  return service.delete(`/reservations/${id}`);
}





