const mongoose=require('mongoose');

const guardSchema=new mongoose.Schema({
	name: {type: String, required: true},
	age: {type: Number, required: true},
	SPP_Expiry_Date: {type: Date, required: true},
});

module.exports=guardSchema;



