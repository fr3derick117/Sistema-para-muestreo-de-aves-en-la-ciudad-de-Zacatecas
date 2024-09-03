const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
    correo: { type: String, required: true },
    contrasena: { type: String, required: true },
    confirmado: { type: Boolean, required: true }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);