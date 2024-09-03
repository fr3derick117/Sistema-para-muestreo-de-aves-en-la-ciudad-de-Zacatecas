const Correo = require('../models/correo');

const correoCtrl = {};

correoCtrl.getCorreos = async (req, res) => {
    const correos = await Correo.find(); //Busca todos los correos
    res.json(correos);
};

correoCtrl.createCorreo = async (req, res) => {
    const correo = new Correo(req.body); //Crea un nuevo correo
    await correo.save();
    console.log(correo);
    res.json({
        status: 'Correo guardado'
    });
};

correoCtrl.getCorreo = async (req, res) => {
    const correo = await Correo.findById(req.params.id); //Busca un correo por su ID
    //console.log(req.params.id);
    res.json(correo);
};

correoCtrl.editCorreo = async (req, res) => {
    const { id } = req.params; //Edita un correo por su ID
    const correo = {
        destinatario: req.body.destinatario,
        cuerpo_correo: req.body.cuerpo_correo,
        link_dinamico: req.body.link_dinamico
    };
    await Correo.findByIdAndUpdate(id, {$set: correo}, {new: true});
    res.json({
        status: 'Correo actualizado'
    });
};

correoCtrl.deleteCorreo = async (req, res) => {
    //await Correo.findByIdAndRemove(req.params.id); //Elimina un correo por su ID
    await Correo.findByIdAndDelete(req.params.id);
    res.json({
        status: 'Correo eliminado'
    });
};

module.exports = correoCtrl;