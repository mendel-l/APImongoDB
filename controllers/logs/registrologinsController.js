const RegistroLogs = require('../../models/logs/RegistroLogs');
const axios = require('axios');

// POST - Registrar un nuevo pago
exports.registrarPago = async (req, res) => {
    try {
        const registro = new RegistroLogs({
            monto_pagado: req.body.montoPagado,
            fecha_pago: new Date(req.body.fechaPago),
            correlativo: req.body.correlativo,
            json_recibido: JSON.stringify(req.body),
        });
        await registro.save();

        // Enviar respuesta al API de PostgreSQL
        const correlativo = req.body.correlativo;
        const status = 'estado exitoso';

        try {
            const response = await axios.post('http://localhost:3000/tickets/estado', { correlativo, status });
            if (response.status !== 200) {
                throw new Error('Error al actualizar el estado del ticket en PostgreSQL');
            }
            res.status(201).json(registro);
        } catch (error) {
            console.error('Error al enviar respuesta al API de PostgreSQL:', error);
            res.status(500).json({ error: 'Error al registrar el pago' });
        }
    } catch (error) {
        console.error('Error al guardar en MongoDB:', error);
        res.status(500).json({ error: 'Error al registrar el pago' });
    }
};

// PUT - Actualizar un pago existente (este es un ejemplo, necesitas adaptar según tu lógica de negocio)
exports.actualizarPago = async (req, res) => {
    try {
        const { correlativo } = req.params; // Asume que se enviará el correlativo como parte del URL
        const registro = await RegistroLogs.findOne({ correlativo: correlativo });
        if (!registro) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }

        // Actualiza los campos necesarios
        registro.monto_pagado = req.body.montoPagado || registro.monto_pagado;
        registro.fecha_pago = req.body.fechaPago ? new Date(req.body.fechaPago) : registro.fecha_pago;

        await registro.save();
        res.status(200).json({ message: 'Pago actualizado correctamente', registro });
    } catch (error) {
        console.error('Error al actualizar el pago en MongoDB:', error);
        res.status(500).json({ error: 'Error interno al actualizar el pago' });
    }
};
