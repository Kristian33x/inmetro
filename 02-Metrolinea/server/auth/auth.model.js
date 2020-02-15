const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true)

const userSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    contrasena: {
        type: String,
        required: true,
        trim: true
    },
    tipoUsuario: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        required: true
    },


}, {
    timestamps: true
});

module.exports = userSchema;