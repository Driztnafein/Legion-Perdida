const express = require('express');
const router =express.Router();
const upload = require("../config/multer.config");
const userController = require("../controllers/user.controller");
const gamesController = require("../controllers/game.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/isAdminCheck.middleware");


router.post("/users", upload.single("avatar"), userController.create);
router.post("/users/login", userController.login);  
router.post("/users/logout", userController.logout);


router.post("/game", isAuthenticated, isAdmin, gamesController.create);
router.get("/game/:id", isAuthenticated, gamesController.detail);
router.get("/game", isAuthenticated, gamesController.list);
router.patch("/game/:id", isAuthenticated, isAdmin, gamesController.update);
router.delete("/game/:id", isAuthenticated, isAdmin, gamesController.delete);





module.exports = router;