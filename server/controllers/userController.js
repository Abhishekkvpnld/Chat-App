const User = require('../model/userModel');
const bcrypt = require('bcrypt')

module.exports.register = async (req, res, next) => {
    try {
        console.log(req.body)
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username })
        if (usernameCheck) {
            return res.json({ msg: 'Username is already used', status: false })
        }
        const emailCheck = await User.findOne({ email })
        if (emailCheck) {
            return res.json({ msg: 'Email already used' })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })
        delete user.password;
        return res.json({ status: true, user })
    } catch (ex) {
        next(ex);
    }
}

module.exports.login = async (req, res, next) => {
    try {
        // console.log(req.body)
        const { username, password } = req.body;
        const userCheck = await User.findOne({ username })
        if (!userCheck) {
            return res.json({ msg: 'Incorrect Username and Password', status: false })
        }
        const IsPasswordValid = await bcrypt.compare(password,userCheck.password);
        if(!IsPasswordValid){
            return res.json({msg:"Incorrect Username and Password",status:false})
        }
            delete userCheck.password
            return res.json({ status: true, userCheck })
  
    } catch (ex) {
        next(ex);
    }
}

module.exports.setAvatar = async(req,res,next)=>{
try{
const userId = req.params.id;
const avatarImage = req.body.image;
const userData = await User.findOneAndUpdate({ _id: userId }, {
    $set: {
        isAvatarImageSet: true,
        avatarImage,
    },
});
return res.json({
    isSet:userData.isAvatarImageSet,
    image:userData.avatarImage
})
}catch(ex){
    next(ex)
} 
}

module.exports.getAllUser = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id} })
            .select(["email", "username", "avatarImage", "_id"]);
console.log(users)
        return res.json(users);
    } catch (ex) {
        next(ex)
    }
};
