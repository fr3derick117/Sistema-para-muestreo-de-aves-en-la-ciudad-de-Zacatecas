const express = require('express');
const router = express.Router();

const usuario = require('../controllers/usuario.controller');

router.get('/usuarios', usuario.getUsuarios);
router.post('/usuarios', usuario.createUsuario);
router.get('/usuarios/:id', usuario.getUsuario);
router.put('/usuarios/:id', usuario.editUsario);
router.delete('/usuarios/:id', usuario.deleteUsuario);

module.exports = router;
