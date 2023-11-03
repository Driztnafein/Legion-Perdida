const express = require('express');
const router =express.Router();
const upload = require("../config/multer.config");
const userController = require("../controllers/user.controller");

router.post("/users", upload.single("avatar"), userController.create);
router.post("/users/login", userController.login);  






module.exports = router;