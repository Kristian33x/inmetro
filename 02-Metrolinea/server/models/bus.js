const mongoose = require('mongoose');
const { Schema } = mongoose;

const BusSchema = new Schema({
    // a pesar de ser requeridos, se pueden omitir ciertos campos, se debe arreglar
    // Este esquema es usado para las rutas a pesar de que su nombre es BusSchema
    nombre: { type: String, required: true },
    descripcion: { type: String, require: true },
    imagenBus: { type: String, required: true },
    Fecha: { type: String, require: true },
    imagenTipoBus: { type: String, require: true },
    NumBusesAsociados: { type: Number, require: true }, //se podria obtener del array de buses
    arrayBuses: { type: String, require: false }, //luego cambiar el tipo de string a buses

});



module.exports = mongoose.model('Ruta', BusSchema);