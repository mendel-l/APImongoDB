const RegistroLogs = require('../../models/logs/RegistroLogs');

exports.registrarPago = async (req, res) => {
    try {
        const registro = new RegistroLogs({
            monto_pagado: req.body.montoPagado,
            fecha_pago: new Date(req.body.fechaPago),
            correlativo: req.body.correlativo,
            json_recibido: JSON.stringify(req.body)
        });
        await registro.save();
        res.status(201).json(registro);
    } catch (error) {
        console.error("Error al guardar en MongoDB: ", error);
        res.status(500).json({ error: 'Error al registrar el pago' });
    }
};
