const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123';

exports.getUsers = async(req, res) => {
    const user = await User.find();
    res.json(user);
};

exports.getUser = async(req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
};

exports.deleteUser = async(req, res) => {
    const { id } = req.params;
    await User.findByIdAndRemove(id);
    res.json({
        "estatus": "User Admin Eliminado"
    });
}

// no edita el usuario.. solo edita el estado del usuario
// exports.editUser2 = async(req, res) => {
//     const { id } = req.params;
//     const user = {
//         estado: req.body.estado
//     }
//     await User.findByIdAndUpdate(id, { $set: user }, { new: true });
//     // await User.findOneAndUpdate(id, { $set: user }, { new: true });

//     res.json({
//         "estatus": "User Actualizado"
//             // "req.body": req.body
//     });
// };

// Edita todos los campos del usuario
exports.editUser = async(req, res) => {
    const { id } = req.params;
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        contrasena: bcrypt.hashSync(req.body.contrasena),
        tipoUsuario: req.body.tipoUsuario,
        estado: req.body.estado
    }
    await User.findByIdAndUpdate(id, { $set: user }, { new: true });

    res.json({
        "estatus": "User Actualizado"
            // "req.body": req.body
    });
};
exports.editEstadoUser = async(req, res) => {
    const { id } = req.params;
    const user = {
        estado: req.body.estado
    }
    await User.findByIdAndUpdate(id, { $set: user }, { new: true });

    res.json({
        "estatus": "UserEstado Actualizado",
        "req": req.body
    });
};

exports.createUser = (req, res, next) => {
    const newUser = {
        nombre: req.body.nombre,
        email: req.body.email,
        contrasena: bcrypt.hashSync(req.body.contrasena),
        tipoUsuario: req.body.tipoUsuario,
        estado: req.body.estado,
    }

    User.create(newUser, (err, user) => {
        if (err && err.code === 11000) return res.status(409).send('Email ya existe');

        if (err) return res.status(500).send('Server error :(');
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id },
            SECRET_KEY, {
                expiresIn: expiresIn
            });
        const dataUser = {
                nombre: user.nombre,
                email: user.email,
                tipoUsuario: user.tipoUsuario,
                estado: user.estado,
                accessToken: accessToken,
                expiresIn: expiresIn
            }
            //response
        res.send({ dataUser });

    });

}

exports.loginUser = (req, res, next) => {
    const userData = {
        email: req.body.email,
        contrasena: req.body.contrasena
    }
    User.findOne({ email: userData.email }, (err, user) => {
        if (err) return res.status(500).send('Server Error :/');

        if (!user) {
            // el email no existe
            res.status(409).send({ message: 'Something is wrong1' });
        } else {
            const resultPassword = bcrypt.compareSync(userData.contrasena, user.contrasena);

            if (resultPassword) {
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });

                const dataUser = {
                    nombre: user.nombre,
                    email: user.email,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
                res.send({ dataUser });
            } else {
                //contrasena equivocada
                res.status(409).send({ message: 'Something is wrong2' });
            }
        }
    })
}