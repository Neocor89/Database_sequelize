//: Imports :
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

//: Importation for home security :
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/edit', auth, multer, userCtrl.editUser);

//+ Déplacé app.js + ajout router
router.get('/api/users/:id', auth, userCtrl.getOneUser);
router.get('/api/users', auth, userCtrl.getAllUsers);
router.delete('/api/users/:id', auth, userCtrl.deleteUserAccount);

module.exports = router;