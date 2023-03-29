const { Router } = require('express');
const dogs=require("./dogs")
const imgsroute = require("./images")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogs);
router.use("/images", imgsroute);

module.exports = router;
