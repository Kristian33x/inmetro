const Users = require('./auth.controller');

module.exports = (router) => {
    router.post('/register', Users.createUser);
    router.post('/login', Users.loginUser);
    router.get('/user', Users.getUsers);
    router.put('/user/:id', Users.editUser);
    router.put('/user/estado/:id', Users.editEstadoUser);
    router.get('/user/:id', Users.getUser);
    router.delete('/user/:id', Users.deleteUser);

}