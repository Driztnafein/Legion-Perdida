import axios from 'axios';
import moment from 'moment';

const service = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.REACT_APP_BASE_API_URL || "http://localhost:3000/v1",
});


const date = new Date();
const formattedDate = moment(date).format('YYYY-MM-DD');
console.log(formattedDate);  // Imprime la fecha en formato 'YYYY-MM-DD'

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

export function updateUser(userId, formData) {
  return service.patch(`/users/${userId}`, formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  });
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

export function getUserReservationDates(userId) {
  return service.get(`/users/${userId}/reservations-date`);
}

export function updateReservation(id, updateData) {
  return service.patch(`/reservations/${id}`, updateData);
}

export function deleteReservation(id) {
  return service.delete(`/reservations/${id}`);
}

export function sendUserInvitations(reservationId, userIds) {
  return service.post(`/reservations/${reservationId}/send-invitations`, { userIds });
}

export function getGameAvailability(gameId, date) {
  // Convertir la fecha a una cadena en formato 'YYYY-MM-DD'
  const dateString = date ? date.toISOString().split('T')[0] : undefined;

  return service.get(`/games/${gameId}/availability`, { params: { date: dateString } });
}


