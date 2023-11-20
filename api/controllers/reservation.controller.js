const Reservation = require('../models/reservation.model');
const createError = require('http-errors');
const  {sendInvitationEmail}  = require('../config/nodemailer.config');
const User = require('../models/user.model');


module.exports.create = (req, res, next) => {
    let createdReservation;

    Reservation.create({
        user: req.session.userId,
        game: req.body.game,
        reservationDate: req.body.reservationDate,
        table: req.body.table,
        startTime: req.body.startTime,
        duration: req.body.duration,
        players: req.body.players,
    })
    .then(reservation => {
        createdReservation = reservation; // Guarda la reserva en una variable
        return User.findById(req.session.userId); // Busca el usuario basado en la sesión
    })
    .then(user => {
        if (user) {
            sendInvitationEmail(user.email, createdReservation); // Envia un email al usuario
        }
        res.status(201).json(createdReservation); // Responde con la reserva creada
    })
    .catch(next); // Maneja cualquier error
};

module.exports.list = (req, res, next) => {
    Reservation.find({ user: req.user.id }) // Filtra las reservas por el ID del usuario
        .populate('user')
        .populate('game')
        .then((reservations) => {
            res.status(200).json(reservations);
        })
        .catch(next);
};

module.exports.detail = (req, res, next) => {
    Reservation.findById(req.params.id)
        .populate('user')
        .populate('game')
        .then((reservation) => {
            if (reservation) {
                res.status(200).json(reservation);
            } else {
                next(createError(404, 'Reservation not found'));
            }
        })
        .catch(next);
};

module.exports.update = (req, res, next) => {
    Reservation.findByIdAndUpdate(
        req.params.id,
        req.body, 
        { new: true, runValidators: true } 
    )
    .then((reservation) => {
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json(reservation);
    })
    .catch((error) => {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            res.status(400).json({ message: 'Validation error', errors: messages });
        } else {
            next(error);
        }
    });
};

module.exports.delete = (req, res, next) => {
    Reservation.findByIdAndDelete(req.params.id)
        .then((reservation) => {
            if (reservation) {
                res.status(204).json();
            } else {
                next(createError(404, 'Reservation not found'));
            }
        })
        .catch(next);
};

module.exports.listUserReservations = (req, res, next) => {
    Reservation.find({ user: req.user.id })
        .then((reservations) => {
            const dates = reservations.map(reservation => reservation.reservationDate);
            res.status(200).json(dates);
        })
        .catch(next);
};
