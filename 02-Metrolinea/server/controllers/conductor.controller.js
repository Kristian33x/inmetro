const Conductor = require('../models/conductor');
const conductorCtrl = {};


conductorCtrl.getConductores = async(req, res) => {
    const conductores = await Conductor.find();
    res.json(conductores);
};


conductorCtrl.getConductor = async(req, res) => {
    const conductor = await Conductor.findById(req.params.id);
    res.json(conductor);
};



conductorCtrl.createConductor = async(req, res) => {
    const conductor = new Conductor({
        placa: req.body.placa,
        tipoBus: req.body.tipoBus,
        RutaAsociada: req.body.RutaAsociada,
        ConductorAsociado: req.body.ConductorAsociado,
        longitud: req.body.longitud,
        latitud: req.body.latitud,
        sentido: req.body.sentido
    });
    await conductor.save();
    //console.log(conductor);
    // console.log(req.body);
    res.json({
        "estatus": "Conductor Guardado"
    });
};

conductorCtrl.editConductor = async(req, res) => {
    const { id } = req.params;
    const conductor = {
        placa: req.body.placa,
        tipoBus: req.body.tipoBus,
        RutaAsociada: req.body.RutaAsociada,
        ConductorAsociado: req.body.ConductorAsociado,
        longitud: req.body.longitud,
        latitud: req.body.latitud,
        sentido: req.body.sentido
    }
    await Conductor.findByIdAndUpdate(id, { $set: conductor }, { new: true });

    res.json({
        "estatus": "Conductor Actualizado"
    });
};

conductorCtrl.deleteConductor = async(req, res) => {
    const { id } = req.params;
    await Conductor.findByIdAndRemove(id);
    res.json({
        "estatus": "Conductor Eliminado"
    });
}

module.exports = conductorCtrl;