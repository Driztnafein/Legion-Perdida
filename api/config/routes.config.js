const express = require('express');
const router =express.Router();
const upload = require("./multer.config");
const userController = require("../controllers/user.controller");
const gamesController = require("../controllers/game.controller");
const reservationController = require("../controllers/reservation.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/isAdminCheck.middleware");
const { isOwnerOrAdmin } = require("../middlewares/isOwnerOrAdmin.middleware");
const { sendInvitationEmail } = require("./nodemailer.config");
const User = require("../models/user.model");
const Reservation = require("../models/reservation.model");



router.post("/users", upload.single("avatar"), userController.create);
router.post("/users/login", userController.login);  
router.post("/users/logout", userController.logout);
router.get("/users/:id", isAuthenticated, userController.detail);
router.get("/users", isAuthenticated, userController.list);
router.patch("/users/:id", isAuthenticated, userController.update);
router.delete("/users/:id", isAuthenticated,isAdmin, userController.delete);
router.post('/user/:id/avatar', upload.single('avatar'), (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            user.avatar = req.file.path;
            return user.save();
        })
        .then(() => res.status(200).json({ message: 'Imagen de perfil actualizada' }))
        .catch(err => next(err));
});
router.get("/users/:id/reservations-date", isAuthenticated, reservationController.listUserReservations);



router.post("/game", isAuthenticated, isAdmin, gamesController.create);
router.get("/game/:id", gamesController.detail);
router.get("/game", gamesController.list);
router.patch("/game/:id", isAuthenticated, isAdmin, gamesController.update);
router.delete("/game/:id", isAuthenticated, isAdmin, gamesController.delete);
router.get('/games/:gameId/availability', isAuthenticated, gamesController.getGameAvailability);



router.post("/reservation", isAuthenticated, reservationController.create);
router.get("/reservation", isAuthenticated, reservationController.list);
router.get("/reservation/:id", isAuthenticated, reservationController.detail);
router.patch("/reservations/:id", isAuthenticated, isOwnerOrAdmin, reservationController.update);
router.delete("/reservations/:id", isAuthenticated, isOwnerOrAdmin, reservationController.delete);


router.post('/reservations/:id/send-invitations', (req, res, next) => {
  const { userIds } = req.body;
  const reservationId = req.params.id;

  // Busca los detalles de la reserva
  Reservation.findById(reservationId)
    .then(reservation => {
      // Busca los usuarios a los que se les enviarán las invitaciones
      User.find({ _id: { $in: userIds } })
        .then(users => {
          users.forEach(user => {
            // Envía las invitaciones con los detalles de la reserva
            sendInvitationEmail(user.email, reservation);
          });
          res.status(200).json({ message: 'Invitaciones enviadas' });
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = router;