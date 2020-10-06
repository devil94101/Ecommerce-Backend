const express=require('express')
const jwt =require('jsonwebtoken');
const bcrypt=require('bcryptjs')
const router=express.Router()
const auth=require('../middleware/auth')
const UserModel=require('../models/user')
require('dotenv').config()
router.get('/',(req,res)=>{
    res.send("user");
})
router.get('/get',auth,async(req,res)=>{
    const user=await UserModel.findById(req.user.id);
    res.send({
        err:false,
        user
    })
})
router.post('/register',(async(req,res)=>{
    let {name,email,password}=req.body;
    try{
        let user=await UserModel.findOne({email})
        if(user){
            return(res.json({
                err:true,
                msg:"email already exist"
            }))
        }
        const salt=await bcrypt.genSalt(10);
        password=await bcrypt.hash(password,salt)
        user=new UserModel({
            name,email,password
        })
        await user.save()
        const payload={
            user:{
                id:user._id
            }
        }
        jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:360000
        },(err,token)=>{
            if(err)return(console.log(err))
            res.json({token,user})
        }); 
    }
    catch(err){
        res.send({
            err:true,
            msg:"server error"
        });
    }
}))
router.post('/login',async(req,res)=>{
    let {email,password}=req.body;
    try{
        const user=await UserModel.findOne({email});
        if(!user){
            return res.json({
                err:true,
                msg:"email or password is incorrect"
            })
        }
        const isEqual=await bcrypt.compare(password,user.password)
        if(!isEqual){
            return res.json({
                err:true,
                msg:"email or password is incorrect"
            })
        }
        const payload={
            id:user._id
        }
        jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:36000
        },(err,token)=>{
            if(err)throw err
            res.json({token,user})
        })
    }   
    catch(err){
        console.log(err.message);
        res.send({
            err:true,
            msg:"server error"
        });
    }
})
router.post('/update',async(req,res)=>{
    const user=await UserModel.findByIdAndUpdate(req.body.userId,{cartItems:req.body.cartItems})
    res.send(user);
})
module.exports=router
