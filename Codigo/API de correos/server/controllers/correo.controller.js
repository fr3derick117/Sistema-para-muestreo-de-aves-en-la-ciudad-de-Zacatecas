const Correo = require('../models/correo');

const correoCtrl = {};

/*correoCtrl.getHome = async (req, res) => {
    res.render('../..frontend/pages/index.ejs');
};*/

// Manejador para obtener todos los correos
correoCtrl.getCorreos = async (req, res) => {
    try {
        const correos = await Correo.find(); // Busca todos los correos
        res.json(correos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los correos', error });
    }
};

// Manejador para crear un nuevo correo
correoCtrl.createCorreo = async (req, res) => {
    try {
        const correo = new Correo(req.body); // Crea un nuevo correo
        await correo.save();
        console.log(correo);
        res.json({ status: 'Correo guardado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el correo', error });
    }
};

// Manejador para obtener un correo por su ID
correoCtrl.getCorreo = async (req, res) => {
    try {
        const correo = await Correo.findById(req.params.id); // Busca un correo por su ID
        res.json(correo);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el correo', error });
    }
};

// Manejador para editar un correo por su ID
correoCtrl.editCorreo = async (req, res) => {
    try {
        const { id } = req.params; // Edita un correo por su ID
        const correo = await Correo.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ status: 'Correo actualizado', correo });
    } catch (error) {
        res.status(500).json({ message: 'Error al editar el correo', error });
    }
};

correoCtrl.deleteCorreo = async (req, res) => {
    //await Correo.findByIdAndRemove(req.params.id); //Elimina un correo por su ID
    try {
        await Correo.findByIdAndDelete(req.params.id);
        res.json({status: 'Correo eliminado'});
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el correo', error });
    }
};

module.exports = correoCtrl;