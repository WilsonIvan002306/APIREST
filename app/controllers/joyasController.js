const joyasModel = require('../models/joyasModel')

function buscarTodo(req,res){
    joyasModel.find({})
    .then(joyas =>{
        if (joyas.length) {
            return res.status(200).send({joyas})
        }
        return res.status(204).send({mensaje:"No hay nada que mostrar"})
    })
    .catch(e =>{return res.status(404).send({mensaje:`Error al consultar la informacion ${e}`})})
}

function agregarJoya(req, res) {
    console.log(req.body)
    new joyasModel(req.body).save()
    .then(info =>{
        return res.status(200).send({
            mensaje:"La informacion se guardo de forma correcto",
            info
        })
    })
    .catch(e => {
        return res.status(404).send({mensaje:`Error al guardar la informacion ${e}`})
    })   
}

function buscarJoya(req, res, next) {
    var consulta = {};
    consulta[req.params.key] = req.params.value;
    console.log(consulta);
    
    joyasModel.find(consulta)
    .then(joyas => {
        if (!joyas || !joyas.length) {
            req.body = req.body || {}; // Asegurarse de que req.body existe
            req.body.joyas = [];
            return next();
        }
        req.body = req.body || {}; // Asegurarse de que req.body existe
        req.body.joyas = joyas;
        return next();
    })
    .catch(e => {
        req.body = req.body || {}; // Asegurarse de que req.body existe
        req.body.e = e;
        return next();
    });
}

function mostrarJoya(req, res) {
    if (req.body.e) {
        return res.status(404).send({mensaje: `Error al buscar la informacion ${req.body.e}`});
    }
    if (!req.body.joyas || !req.body.joyas.length) {
        return res.status(204).send({mensaje: "No hay nada que mostrar"});
    }
    let joyas = req.body.joyas;
    return res.status(200).send({joyas});
}

function eliminarJoya(req, res){
    var joyas = {} 
    joyas = req.body.joyas
    joyasModel.deleteOne(joyas[0])
    .then(info => {
        return res.status(200).send({mensaje: "Registro eliminado", info})
    })
    .catch(e => {
        return res.status(404).send({mensaje: "Error al eliminar la informacion", e})
    })

}

function modificarJoya(req, res) {
    const joyas = {};
    joyas[req.params.key] = req.params.value;

    const nuevosDatos = req.body;

    joyasModel.updateOne(joyas, nuevosDatos)
        .then(resultado => {
            if (resultado.matchedCount === 0) {
                return res.status(404).send({ mensaje: "No se encontró la joya a modificar" });
            }
            return res.status(200).send({ mensaje: "Joya modificada correctamente", resultado });
        })
        .catch(e => {
            return res.status(404).send({ mensaje: `Error al modificar la joya: ${e.message}` });
         });
}





module.exports = {
    buscarTodo,
    agregarJoya,
    buscarJoya,
    mostrarJoya,
    eliminarJoya,
    modificarJoya

}