const mongoose = require('mongoose')

const joyasSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        length:50
    },

    descripcion:{
        type:String,
        required: true,
        length: 200
    },

    precio:{
        type:Number,
        required: true
    },

    peso:{
        type:Number,
        required: true
    },

    stock:{
        type:Number,
        default: 10
    }

})

const joyasModel = mongoose.model('joyas', joyasSchema)

module.exports = joyasModel