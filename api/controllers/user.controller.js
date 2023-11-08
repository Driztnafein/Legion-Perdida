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
    res.status(201).json({ email: user.email, name: user.name, avatar: user.avatar });
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
            res.status(401).json({ error: "Incorrect password" });
          }
        });
      } else {
        console.log('User not found');
        res.status(401).json({ error: "User not found" });
      }
    })
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        next(createError(404, "User not found"));
      }
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.params.id, { name , email }, { new: true })
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        next(createError(404, 'User not found'));
      }
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (user) {
        res.status(204).json();
      } else {
        next(createError(404, 'User not found'));
      }
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.status(204).json({ message: "Logout successful" });
};

module.exports.list = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
}








