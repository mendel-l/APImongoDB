const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
// En RegistroLogs.js
const RegistroLogsSchema = new mongoose.Schema({
    monto_pagado: { type: Number, required: true },
    fecha_pago: { type: Date, required: true },
    correlativo: { type: String, required: true },
    timestamp_recepcion: { type: Date, default: Date.now },
    json_recibido: { type: String, required: true }
});

RegistroLogsSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('RegistroLogs', RegistroLogsSchema);