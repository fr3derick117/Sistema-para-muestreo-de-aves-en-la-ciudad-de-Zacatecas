const express = require('express');
const router = express.Router();

const usuario = require('../controllers/usuario.controller');

router.get('/usuarios', usuario.getUsuarios);
router.post('/usuarios', usuario.createUsuario);
router.get('/usuarios/:id', usuario.getUsuario);
router.put('/usuarios/:id', usuario.editUsuario);
router.delete('/usuarios/:id', usuario.deleteUsuario);
router.get('/prueba', usuario.usarIdUsuario);

router.get('/enviarcorreo', usuario.enviarCorreo);
router.get('/:id_usuario', usuario.mostrarPagina);

/*router.get('/:id_usuario', function(req, res) {
    const id_usuario = req.params.id_usuario;
    res.render('../views/pages/index', {id_usuario});
});*/

module.exports = router;
