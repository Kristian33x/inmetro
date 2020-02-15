const mongoose = require('mongoose');
const { Schema } = mongoose;
const Bus = require('../models/bus');

const ConductorSchema = new Schema({
    //Este esquema es usado para cada uno de los buses (haciendo referencia a su conductor) (Ya no hace referencia a su conductor, ahora uno de sus campos es el conductor)

    tipoBus: { type: String, required: true },
    placa: { type: String, require: true, unique: true },
    RutaAsociada: {
        type: {
            _id: String,
            nombre: String,
            descripcion: String,
            imagenBus: String,
            Fecha: String,
            imagenTipoBus: String,
            NumBusesAsociados: Number,
            arrayBuses: String
        },
        require: false
    }, // todo bus tiene una Ruta asociada, lo cual corresponde a un schema como el de arriba (BusSchema)
    ConductorAsociado: {
        type: {
            _id: String,
            nombre: String,
            email: String,
            tipoUsuario: String,
            estado: Boolean,
        },
        require: false
    },
    longitud: { type: Number, require: false },
    latitud: { type: Number, require: false },
    sentido: { type: Number, require: false } // este campo se puede usar para el estado del bus (conductor), activo o inactivo.. decid[i colocar el estado en el UserI

});


module.exports = mongoose.model('Conductor', ConductorSchema);