const User = require("../models/user.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


module.exports.create = (req, res, next) => {
    User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      avatar: req.file?.path,
    })
    .then((user) => {
        const userResponse = user.toObject();
        delete userResponse.password;
        res.status(201).json(userResponse);
    })
    .catch(next);
  };

  module.exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          user.checkPassword(req.body.password, user.password).then((match) => {
            if (match) {
              req.session.userId = user.id;
              console.log('Login successful, session established:', req.session);
              res.json(user);
            } else {
              console.log('Password does not match');
              res.status(401).json({ error: "unauthorized" });
            }
          });
        } else {
          console.log('User not found');
          res.status(401).json({ error: "unauthorized" });
        }
      })
      .catch(next);
  };

module.exports.logout = (req, res, next) => {
    req.session.destroy();
    res.status(204).json();
};


  
  
  
  
  



