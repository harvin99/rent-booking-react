const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2

const User = require('../../models/users.model')

module.exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.signedCookies.userId)
        if(!user){
            res.status(500).json({error : "You need to login !"})
            return
        }
        else{
            var users = await User.find()

            if (user.isAdmin) {
                res.status(200).json({users : users})
            }
            else{
                res.status(200).json({user : user})
            }
        }
  } catch (error) {
    console.log(error.message)
  }
}
module.exports.postCreateUser = async (req, res) => {
try {
    const existEmailUser = await User.findOne({ email: req.body.email })
    if (existEmailUser) {
        res.status(500).json({error : "Email was exist !"})
        return;
    }
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    let user = new User()

    user.name = req.body.name
    user.email = req.body.email
    user.phone = req.body.phone
    user.password = hashedPassword
    user.isAdmin = false
    user.wrongLoginCount = 0
    user.avatarUrl = '/avatar_default.jpg'

    user.save()
    res.status(200).json({message : "Created account success !"})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({error : error})
  }
};
module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if(!user){
      res.status(500).json({error : "User is not found !"})
      return
    }
    else {
      res.status(200).json({user : user})
    }
  } catch (error) {
    console.log(error.message)
  }
};


module.exports.getUserIdToDelete = async (req, res) => {
  try {
    
    if(!await User.findById(req.params.id)){
      res.status(500).json({error : "User is not found !"})
    }
    else {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json({message : "Deleted user success !"})
    }
  } catch (error) {
    console.log(error.message)
  }
};
module.exports.updateUserById = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, 
                    { name: req.body.name, phone: req.body.phone })
    res.status(200).json({message : "Update user success !"})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({error : "Update user success !"})
  }
};
