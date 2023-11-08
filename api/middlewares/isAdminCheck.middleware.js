const User = require("../models/user.model");
const createError = require("http-errors");

module.exports.isAdmin = (req, res, next) => {
    console.log('Middleware isAdmin: req.user:', req.user, 'req.user.role:', req.user.role);
    if (req.user && req.user.role === "ADMIN") {
        next();
    } else {
        next(createError(401, "Unauthorized"));
    }
};