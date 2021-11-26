const mongoose = require("mongoose");

// msg schema
const MsgSchema = new mongoose.Schema({
	id: {type:Number, required:true},
	message: {type:String, required:true},
	time: {type:Date, required:true}
})

const Msg = mongoose.model('Msg', MsgSchema); //convert to model named Msg
module.exports = Msg; //export for controller use