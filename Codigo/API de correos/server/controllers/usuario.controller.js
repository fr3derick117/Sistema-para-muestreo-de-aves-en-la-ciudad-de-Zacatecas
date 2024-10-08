const Usuario = require("../models/usuario");
const CorreoCtrl = require("./correo.controller");
const PostageApp = require('postageapp');
const jwt = require('jsonwebtoken');
const usuarioCtrl = {};

const StandarException = require('../exception/StandarException');
const codigos = require('../exception/codigos');

const key = "VSSL";
let id_usuario;

usuarioCtrl.mostrarPagina = async (req, res) => {
    id_usuario = req;
    console.log(id_usuario);
    const usuario = await Usuario.findById(id_usuario); 
    if (usuario){
        const usuario = {confirmado: true};
        await Usuario.findByIdAndUpdate(id_usuario, { $set: usuario }, { new: true });
        //await usuarioCtrl.editUsuario(id_usuario, res);
        //res.render("../views/pages/index");
        res.render("../views/pages/index", { id_usuario });
        //res.json({ usuario });
    } else {
        return new StandarException('Usuario no encontrado', codigos.datosNoEncontrados);
    }
}

usuarioCtrl.getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find(); //Busca todos los usuarios
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios" });
    }
};

usuarioCtrl.createUsuario = async (req, res) => {
    const usuario = new Usuario(req.body); //Crea un nuevo usuario
    const savedUsuario = await usuario.save().catch(error => {
        return new StandarException('Error al guardar el usuario', codigos.errorAlCrearUsuario, error);
    });
    console.log(usuario);
    id_usuario = usuario._id.toString();
    console.log(id_usuario);

    const token = jwt.sign({ id: id_usuario }, key, { expiresIn: '1h' });
    console.log(token);

    const correoEnviado = await usuarioCtrl.enviarCorreo(req, res, token).catch(error => {
        return new StandarException('Error al enviar correo', codigos.errorAlEnviarCorreo, error);
    });
    
    res.json({ status: "Usuario guardado", usuario, id_usuario: id_usuario });
};

usuarioCtrl.getUsuario = async (req, res) => {
    const usuario = await Usuario.findById(req.params.id); //Busca un usuario por su ID
    if(!usuario){
        return new StandarException('Usuario no encontrado', codigos.datosNoEncontrados);
    }
    return usuario;
    //id_usuario = req.params.id;
    //res.json(usuario);
    //usuarioCtrl.usarIdUsuario;
};

usuarioCtrl.editUsuario = async (req, res) => {
    try{
        const { id } = req.params;
        console.log(id);
        const usuario = {
        confirmado: true,
        };
        await Usuario.findByIdAndUpdate(id, { $set: usuario }, { new: true });
        res.json({ status: "Usuario actualizado"  });
    } catch (error) {
        res.status(500).json({ message: 'Usuario no encontrado'});
    }
};

usuarioCtrl.deleteUsuario = async (req, res) => {
    try {
    //await Usuario.findByIdAndRemove(req.params.id); //Elimina un usuario por su ID
        await Usuario.findByIdAndDelete(req.params.id);
        res.json({ status: "Usuario eliminado" });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
};

usuarioCtrl.usarIdUsuario = (req, res) => {
    try {
        console.log(`El id_usuario actual es: ${id_usuario}`);
        res.json({ id_usuario });
    } catch (error) {
        res.status(500).json({ message: "Error al usar id_usuario"});
    }
};

console.log("Usuario: ", id_usuario);

usuarioCtrl.enviarCorreo = async (req, res, token) => {
    console.log("Enviando correo");
    console.log({id_usuario});
    if (!id_usuario) {
        return new StandarException('ID de usuario no definido', codigos.validacionIncorrecta);
    }
    console.log("Enviando correo: 1");
    const link = `http://localhost:3000/confirmado/${token}`;
    console.log({link});
    var postageapp = new PostageApp("VkyMBXgOdzGHtUPoRByHdEelTLYmcTBH");
    //const link = `http://localhost:3000/confirmado`;

    var options = {
        recipients: "idbird.upiiz@gmail.com",
        headers: {
            subject: "Prueba 10",
            from: "idbird.upiiz@gmail.com",
        },
        template: "IdBird_child",
        variables: {
            aplicacion: "IdBird",
            nombre: "Ejemplo",
            link: link,
        },
    };
    // Validar estructura del correo
    if (!options.recipients || !options.headers.subject || !options.headers.from || !options.template || !options.variables.link) {
        return new StandarException('Estructura del correo no válida', codigos.validacionIncorrecta);
    }

    const response = await postageapp.sendMessage(options).catch(error => null);
    if (response === null) {
        return new StandarException('Error al enviar el correo', codigos.errorAlEnviarCorreo);
    }
    res.json(response);
};

console.log("Usuario: ", id_usuario);

module.exports = usuarioCtrl;
