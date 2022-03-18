const { Router } = require('express')
const express = require('express')
const session = require('express-session')
const MemoryStore = require('memorystore')(session)
const MongoStore = require('connect-mongo')
const app = express()
const port = 4000
const router = require('./router')
const morgan = require('morgan')
const {startMongoose} = require('./mongooseConnect')

const start = async () => {
  try {
    await startMongoose()
  } catch (error) {
    console.log(error)
  }
}
start()

app.use(morgan("dev"));

let sess = {
  secret:'maxverstappen',
  resave: true,
  saveUninitialized: true,
  cookie: {
    expires : 600000
  },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
}

// !production 
// if (app.get('env') === 'production') {
//   app.set('trust proxy', 1) // trust first proxy
//   sess.cookie.secure = true // serve secure cookies
// }

app.use(session(sess))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)

app.listen(port, () => {  
  console.log(`Example app listening on port ${port}`)
})