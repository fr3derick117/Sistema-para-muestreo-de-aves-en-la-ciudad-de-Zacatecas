const Usuario = require("../models/usuario");

const usuarioCtrl = {};

usuarioCtrl.getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find(); //Busca todos los usuarios
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los correos", error });
    }
};

usuarioCtrl.createUsuario = async (req, res) => {
    try {
        const usuario = new Usuario(req.body); //Crea un nuevo usuario
        await usuario.save();
        console.log(usuario);
        res.json({ status: "Usuario guardado" });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los correos", error });
    }
};

usuarioCtrl.getUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id); //Busca un usuario por su ID
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los correos", error });
    }
};

usuarioCtrl.editUsuario = async (req, res) => {
    try{
    const { id } = req.params; //Edita un usuario por su ID
    const usuario = {
        correo: req.body.correo,
        contrasena: req.body.contrasena,
        confirmado: req.body.confirmado,
    };
    await Usuario.findByIdAndUpdate(id, { $set: usuario }, { new: true });
    res.json({ status: "Usuario actualizado"  });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los correos', error });
    }
};

usuarioCtrl.deleteUsuario = async (req, res) => {
    try {
    //await Usuario.findByIdAndRemove(req.params.id); //Elimina un usuario por su ID
        await Usuario.findByIdAndDelete(req.params.id);
        res.json({ status: "Usuario eliminado" });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los correos', error });
    }
};

module.exports = usuarioCtrl;
