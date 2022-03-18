const userModel = require('./../model/userModel')

exports.login = async (req, res, next) => {
  try {
    const {
      username,
      password
    } = req.body
    
    const user = await userModel.findOne({
      username
    })

    if(!user) {
      throw ({name: 'Not found'})
    }else{
      await user.comparePassword(password, (error, match) => {
        if(error) throw ({name: 'Unauthorized'})        
        req.session.user = user
        return res.status(200).json({
          message: 'Successfully login',
          data: {
            username,
            session: req.session
          }
        })
      })
    }
  } catch (error) {
    console.log(error)
    next(error) 
  }
}

exports.register = async ( req, res, next) => {
  try {
    const {
      username, 
      email,
      password
    } = req.body

    const newUser = new userModel({
      username,
      email,
      password      
    })

    await newUser.save()
    return res.status(201).json({
      message: 'User registered',
        data: {
          newUser
        }
    })
    
  } catch (error) {
    next(error) 
  }
}

exports.home = async (req, res, next) => {
  try {
    return res.status(200).json({
      message: 'Success',
      session: req.session.user  
    })
  } catch (error) {
    next(error)
  }
}
