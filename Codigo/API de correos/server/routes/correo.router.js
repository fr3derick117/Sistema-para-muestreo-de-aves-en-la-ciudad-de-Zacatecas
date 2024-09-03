const express = require('express');
const router = express.Router();

const correo = require('../controllers/correo.controller');

const usuario = require('../controllers/usuario.controller');

router.get('/correos', correo.getCorreos);
router.post('/correos', correo.createCorreo);
router.get('/correos/:id', correo.getCorreo);
router.put('/correos/:id', correo.editCorreo);
router.delete('/correos/:id', correo.deleteCorreo);


/*router.get('/', (req, res) => {
    res.send('Hola Mundo, API funcionando');
    /*res.json({
        status: 'Hola Mundo, API funcionando'
    });
});*/


module.exports = router;