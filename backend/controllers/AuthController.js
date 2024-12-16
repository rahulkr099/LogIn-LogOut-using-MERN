const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../models/User.js');
const signup = async (req,res)=>{
    try{
        const {name, email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
                .json({message:
                    'User is already exist, you can login',success:false
                })
        }
        const userModel = new UserModel({name, email, password})
        userModel.password= await bcrypt.hash(password,10);
        await userModel.save();
        res.status(201)
            .json({
                message:"signup successfully",
                success:true,
            })
    }catch(err){
        res.status(500)
            .json({
                messsage:`Internal Server error,${err}`,
                success:false,
            })
    }
}
const login = async (req,res)=>{
    try{
        const { email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(403)
                .json({message:
                    'Email or password is wrong',success:false
                })
        }
        const isPassEqual = await bcrypt.compare(password,user.password);
        if(!isPassEqual){
            return res.status(403)
                .json({message:'Password is wrong',success:false})
        }
        const token = jwt.sign({email:user.email,_id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'}) 
        res.status(200)
            .json({
                message:"login successfully",
                success:true,
                token,
                email,
                name:user.name,
            })
    }catch(err){
        res.status(500)
            .json({
                messsage:"Internal server error",
                success:false,
            })
    }
}
module.exports = {signup,login}