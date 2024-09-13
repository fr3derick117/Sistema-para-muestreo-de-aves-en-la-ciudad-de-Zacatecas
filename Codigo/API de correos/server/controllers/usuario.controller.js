const Usuario = require("../models/usuario");
const CorreoCtrl = require("./correo.controller");
const PostageApp = require('postageapp');
const usuarioCtrl = {};

let id_usuario;

usuarioCtrl.mostrarPagina = async (req, res) => {
    try {
        id_usuario = req.params.id_usuario;
        console.log(id_usuario);
        const usuario = await Usuario.findById(id_usuario); 
        if (usuario){
            const usuario = {confirmado: true};
            await Usuario.findByIdAndUpdate(id_usuario, { $set: usuario }, { new: true });
            //await usuarioCtrl.editUsuario(id_usuario, res);
            res.render("../views/pages/index", { id_usuario });
            //res.json({ usuario });
        } else {
            res.status(500).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Usuario no encontrado"});
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
    try {
        const usuario = new Usuario(req.body); //Crea un nuevo usuario
        await usuario.save();
        console.log(usuario);
        id_usuario = usuario._id.toString();
        console.log(id_usuario);

        await usuarioCtrl.enviarCorreo(req, res);

        res.json({ status: "Usuario guardado", usuario, id_usuario: id_usuario });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener crear el usuario" });
    }
};

usuarioCtrl.getUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id); //Busca un usuario por su ID
        id_usuario = req.params.id;
        res.json(usuario);
        usuarioCtrl.usarIdUsuario;
    } catch (error) {
        res.status(500).json({ message: "Usuario no encontrado", error });
    }
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

usuarioCtrl.enviarCorreo = async (req, res) => {
    try {
        console.log({id_usuario});
        const link = `http://localhost:3000/${id_usuario}`;
        console.log({link});
        var postageapp = new PostageApp("VkyMBXgOdzGHtUPoRByHdEelTLYmcTBH");
        //const link = `http://localhost:3000/`;

        var options = {
            recipients: "idbird.upiiz@gmail.com",
            headers: {
                subject: "Prueba 8",
                from: "idbird.upiiz@gmail.com",
            },
            template: "IdBird_child",
            variables: {
                aplicacion: "IdBird",
                nombre: "Ejemplo",
                link: link,
                },
            };

        postageapp.sendMessage(options)/*.then((response) => {
            res.json(response);
        }).catch((error) => {
            res.json(error);
        });*/
    } catch (error) {
        res.status(500).json({ message: 'Error al enviar el correo', error });
    }
};

console.log("Usuario: ", id_usuario);

module.exports = usuarioCtrl;
