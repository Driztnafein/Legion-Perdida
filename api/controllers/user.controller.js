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
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Email no encontrado.' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(401).json({ message: 'Contraseña incorrecta.' });
                    }

                    const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' }); // Debes usar una clave secreta segura y considerar guardarla en variables de entorno
                    res.status(200).json({ message: 'Login exitoso.', token });
                })
                .catch(next);
        })
        .catch(next);
};

