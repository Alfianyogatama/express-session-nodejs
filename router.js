const router = require("express").Router();
const loginController = require('./controllers')
const {errorHandler} = require('./middlewares/errorHandler')
const sessionCheck = require('./middlewares/sessionCheck')

router
.post('/user/login', loginController.login)
.post('/user/register', loginController.register)
.get('/', sessionCheck.check, loginController.home)

router.use(errorHandler)

module.exports = router