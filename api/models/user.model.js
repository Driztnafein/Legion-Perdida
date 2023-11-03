

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const schema = new Schema(
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
        },
        avatar: {
            type: String,
            default: 'https://avatars.dicebear.com/api/initials/:seed.svg'
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = doc._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
                if (!ret.avatar) {
                    ret.avatar = `https://avatars.dicebear.com/api/initials/${encodeURIComponent(ret.email)}.svg`;
                }
            }
        }
    }
);

schema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 10)
            .then(hash => {
                this.password = hash;
                next();
            })
    } else {
        next();
    }
});

schema.methods.checkPassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}


const User = mongoose.model('User', schema);
module.exports = User;