const Usuario = require('../models/usuario');

const usuarioCtrl = {};

usuarioCtrl.getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find(); //Busca todos los usuarios
    res.json(usuarios);
};

usuarioCtrl.createUsuario = async (req, res) => {
    const usuario = new Usuario(req.body); //Crea un nuevo usuario
    await usuario.save();
    console.log(usuario);
    res.json({
        status: 'Usuario guardado'
    });
}

usuarioCtrl.getUsuario = async (req, res) => {
    const usuario = await Usuario.findById(req.params.id); //Busca un usuario por su ID
    res.json(usuario);
}

usuarioCtrl.editUsuario = async (req, res) => {
    const { id } = req.params; //Edita un usuario por su ID
    const usuario = {
        correo: req.body.correo,
        contrasena: req.body.contrasena,
        confirmado: req.body.confirmado
    };
    await Usuario.findByIdAndUpdate(id, {$set: usuario}, {new: true});
    res.json({
        status: 'Usuario actualizado'
    });
}

usuarioCtrl.deleteUsuario = async (req, res) => {
    //await Usuario.findByIdAndRemove(req.params.id); //Elimina un usuario por su ID
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({
        status: 'Usuario eliminado'
    });
}


module.exports = usuarioCtrl;