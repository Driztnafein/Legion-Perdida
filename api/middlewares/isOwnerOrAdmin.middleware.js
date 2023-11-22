const Reservation = require('../models/reservation.model');
const createError = require('http-errors');

module.exports.isOwnerOrAdmin = (req, res, next) => {
    Reservation.findById(req.params.id)
        .populate('user')
        .then(reservation => {
            if (!reservation) {
                return next(createError(404, 'Reservation not found'));
            }
           
            if (req.user && (reservation.user._id.toString() === req.user._id.toString() || req.user.role === 'ADMIN')) {
                next();
            } else {
                next(createError(403, 'User is not authorized to perform this action'));
            }
        })
        .catch(next);
};

