const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String,sparse: true,unique: true,},
  username: String,
  password: String,
  role: {type : String , default : "Users"},
  // img: { data: Buffer, contentType: String },
  img: String,
  date: { type: Date, default: Date.now },
  active: { Type: Boolean, default: false }
})

// UserSchema.statics.isThisEmailInUse = function (email) {

//   try {
//     const user = this.findOne({ email })
//     if (user) 
//        {
//          console.log("Hàm sai")
//           return false 
//        } 
//     else 
//         { return true }

//   } catch (error) {
//     console.log("Error inside method isThisEmailInUse", error.message)
//     return false
//   }

// }
module.exports = mongoose.model('Users', UserSchema)