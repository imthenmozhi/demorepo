const mongoose=require('mongoose');
var Schema=mongoose.Schema;
var prodStu=new Schema({
	id:{type:String},
	firstName:{type:String},
	lastName:{type:String},
	dateOfBirth:{type:Date},
	age:{type:Number},
	generalAddr:{type:String}
});
//var linking schema and collection=(collection name,schema name)
module.exports={stuDet:mongoose.model('stuInfo',prodStu)};
// module.exports={stuDet:studDetail};