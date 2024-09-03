const express = require('express');
const morgan = require('morgan');
const app = express();

const {mongoose} = require('./databases');

//Configuración del servidor
app.set('port', process.env.PORT || 3000);

//Middlewares - funciones de procesamiento de datos
app.use(morgan('dev')); //Mostrar mensajes del usuario
app.use(express.json()); //Traduce JSON

//Routes 
app.use(require('./routes/correo.router'));
app.use(require('./routes/usuario.router'));

//Iniciando el servidor
    //Determinar el puerto del servidor
app.listen(app.get('port'), () => {
    console.log('Server en puerto', app.get('port'));
});

