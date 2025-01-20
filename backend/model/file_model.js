const mongoose = require('mongoose')

const ModelSchema=mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, unique: true, ref:'User' },
    model : {type: "String", required: true},
    requirement : {type: "String", required: true},
    script : {type: "String", required: true},
    status: {type: "String", required: true},
    venvPath: {type: "String"}
})

const Model=mongoose.model('Model',ModelSchema)

module.exports=Model