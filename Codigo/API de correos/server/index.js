const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');

const {mongoose} = require('./databases');

//Configuración del servidor
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs'); // set the view engine to ejs
app.set('views', path.join(__dirname, '../views'));

// Configurar la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, '../views/static')));

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
