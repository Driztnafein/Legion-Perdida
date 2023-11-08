const express = require('express');
const router =express.Router();
const upload = require("../config/multer.config");
const userController = require("../controllers/user.controller");
const gamesController = require("../controllers/game.controller");
const reservationController = require("../controllers/reservation.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/isAdminCheck.middleware");
const { isOwnerOrAdmin } = require("../middlewares/isOwnerOrAdmin.middleware");



router.post("/users", upload.single("avatar"), userController.create);
router.post("/users/login", userController.login);  
router.post("/users/logout", userController.logout);
router.get("/users/:id", isAuthenticated, userController.detail);
router.get("/users", isAuthenticated, userController.list);
router.patch("/users/:id", isAuthenticated, userController.update);
router.delete("/users/:id", isAuthenticated,isAdmin, userController.delete);




router.post("/game", isAuthenticated, isAdmin, gamesController.create);
router.get("/game/:id", isAuthenticated, gamesController.detail);
router.get("/game", isAuthenticated, gamesController.list);
router.patch("/game/:id", isAuthenticated, isAdmin, gamesController.update);
router.delete("/game/:id", isAuthenticated, isAdmin, gamesController.delete);


router.post("/reservation", isAuthenticated, reservationController.create);
router.get("/reservation", isAuthenticated, reservationController.list);
router.get("/reservation/:id", isAuthenticated, reservationController.detail);
router.patch("/reservations/:id", isAuthenticated, isOwnerOrAdmin, reservationController.update);
router.delete("/reservations/:id", isAuthenticated, isOwnerOrAdmin, reservationController.delete);



module.exports = router;