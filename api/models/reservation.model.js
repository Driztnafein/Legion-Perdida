const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    reservationDate: {
        type: Date,
        default: Date.now,
        required: true,
        validate: {
            validator: function (value) {
                return value >= Date.now();
            },
            message: 'Reservation date must be in the future'
        }
    },
    table: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    startTime: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true,
        min: 1
    },
    status: {
        type: String,
        enum: ['reserved', 'in progress', 'completed', 'cancelled'],
        default: 'reserved'
    },
    players: {
        type: Number,
        required: true,
        min: 1
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;