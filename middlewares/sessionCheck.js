exports.check = async (req, res, next) => {
  try{
    console.log(req.session)
    if(req.session.user) {
      next()
    }else{
      throw { name: 'No session' }
    }
  } catch(err) {
    next(err)
  }
}