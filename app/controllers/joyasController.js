const joyasModel = require('../models/joyasModel')

function buscarTodo(req,res){
    joyasModel.find({})
    .then(joyas =>{
        if (joyas.lenght) {
            return res.status(200).send({joyas})
        }
        return res.status(204).send({mensaje:"No hay nada que mostrar"})
    })
    .catch(e =>{return res.status(404).send({mensaje:`Error al consultar la informacion ${e}`})})
}

module.exports = {
    buscarTodo
}