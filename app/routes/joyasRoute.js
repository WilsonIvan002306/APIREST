const express = require('express')
const router = express.Router()
const joyasController = require('../controllers/joyasController')

router.get('/',joyasController.buscarTodo)
    .post('/',joyasController.agregarJoya)
    .get('/:key/:value',joyasController.buscarJoya,joyasController.mostrarJoya)
    .delete('/:key/:value',joyasController.buscarJoya,joyasController.eliminarJoya)
    .put('/:key/:value',joyasController.buscarJoya,joyasController.modificarJoya)


    



module.exports = router