

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre es obligatorio']
        },
        email: {
            type: String,
            required: [true, 'El correo electrónico es obligatorio'],
            unique: true,
            match: [/.+\@.+\..+/, 'Por favor ingresa un correo electrónico válido']
        },
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria']
        },
        role: {
            type: String,
            enum: ['ADMIN', 'USER'],
            default: 'USER'
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;