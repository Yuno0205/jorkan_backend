const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: { type: String , require : true},
  gender : [String],
  tag : [String],
  type : [String],
  price: {type : Number},
  color : [String],
  // options : [{}],
  size: [String],
  images: [String],
  imageSmall : [ String],
  brand : [String],
  discount : {type : Number , default: 0},
  description: {type : String},
//   category: { type: Schema.Types.ObjectId, ref: 'Categories' },

} , {
    timestamps : true
})

module.exports = mongoose.model('Product', ProductSchema)