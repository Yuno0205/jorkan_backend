// const mongoose = require('mongoose')

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect((process.env.MONGO_DB_URL) , () => {
//         console.log("Connected to Monggo DB !");
//     })

//     console.log(`MongoDB Connected: ${conn.connection.host}`)
//   } catch (err) {
//     console.error(err)
//     process.exit(1)
//   }
// }

// module.exports = connectDB