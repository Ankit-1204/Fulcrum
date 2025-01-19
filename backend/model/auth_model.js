const mongoose = require('mongoose')

const UserSchema =mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
})
UserModel=mongoose.model('User',UserSchema);

const ModelSchema=mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, unique: true, ref:'User' },
    model : {type: "String", required: true},
    requirement : {type: "String", required: true},
    script : {type: "String", required: true},
})


module.exports=UserModel