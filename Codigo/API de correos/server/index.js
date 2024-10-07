const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const {mongoose} = require('./databases');
const path = require('path');
const handleError = require('./middleware/error.middleware');

//const PostageApp = require('postageapp');

//var postageapp = new PostageApp('ACCOUNT_API_KEY');

//Configuración del servidor
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs'); // set the view engine to ejs
app.set('views', path.join(__dirname, '../views'));

// Configurar la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, '../views/static')));

//Middlewares - funciones de procesamiento de datos
app.use(morgan('dev')); //Mostrar mensajes del usuario
app.use(express.json()); //Traduce JSON
app.use(express.urlencoded({extended: false})); //Traduce datos de formularios
app.use(cors()); //Permite la comunicación entre servidores
app.use(handleError);

//Routes 
//app.use(require('./routes/correo.router'));
app.use(require('./routes/usuario.router'));

// Ruta con vista por defecto para rutas no definidas
app.use((req, res) => { res.render(path.join(__dirname, '../views/pages/404.ejs')) });

//Iniciando el servidor
    //Determinar el puerto del servidor
app.listen(app.get('port'), () => {
    console.log('Server en puerto', app.get('port'));
});
