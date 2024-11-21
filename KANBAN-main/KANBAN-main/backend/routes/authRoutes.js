// authRoutes.js
const express = require('express');
const router = express.Router();
const userCtrl = require("../controllers/user.controllers/sysusersingnup.controller");

router.post('/', userCtrl.registrouser);  //Registro el usuario 
router.get('/buscar/:email', userCtrl.buscarUsuarioPorEmail); //Ruta para identificar el usuario logeado por su email
router.get('/:id', userCtrl.buscarUsuarioPorId); //Buscar el usuario por su id

module.exports = router;
