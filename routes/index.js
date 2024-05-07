const express = require('express');
const router = express.Router();
//logs
const registrologinsController = require('../controllers/logs/registrologinsController');
const proyectoController = require('../controllers/proyectoController')

module.exports = function () {
    // ruta para el home
    router.get('/', proyectoController.proyectoHome);

    //AQUI VAMOS A TENER UN ORDEN BASTANTE COMPLEJO SINO NOS VAMOS A PERDER
    //LAS RUTAS VAN A ESTAR ORDENADAS SEGUN CARPETAS DE MODELS

    //RUTAS LOGS
    //log
    router.post('/pagos', registrologinsController.registrarPago);
    router.put('/pagos/:correlativo', registrologinsController.actualizarPago);


    return router;
}