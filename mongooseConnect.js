const mongoose = require('mongoose')

exports.startMongoose = async () => {
  try {
      const connection = await mongoose.connect('mongodb://127.0.0.1/trySession', {
        useNewUrlParser:true,
        useUnifiedTopology:true
      })
      console.log('MongoDB database connected successfully')
      return connection
  } catch (err) {
      console.log(err)
      return
  }
}
