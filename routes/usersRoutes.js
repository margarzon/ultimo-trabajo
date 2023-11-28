const usersModel = require('../models/usersModel');
const UsserModel = require ('../models/usersModel');
 const express = require ('express');
 const router = express.Router();


 router.post ('/register', async  ( req, res)=>{

    try{
        const user = await usersModel
        .create(req.body)
        res.status(201).json ({
            success: true,
            data: user
        })


    }catch (error){
        res.status(500).json ({
            success: false,
            msg : error.message


        })

    }

 })
 router.post ('/login', async (req, res)=>{
    try {
        const {email, password} = req.body
        //buscar el usuario 
        //al que corresponde el email
        const user = await usersModel.findOne({email})
        if(!user){
            res.status(401).json({
                success: false,
                msg: "no existe el usuario"
            })
        }else{
            const isMatch = await user.compararPassword(password)
            if(!isMatch){
              res.status(401).json({
                success: false,
                msg: "credenciales invalidas"

              })      
            }else{
                res.status(200).json({
                    success: true,
                    msg: "logueado correctamente"
                })
            }

        }
        console.log(user)
        } catch(error) {
            
        }
 })

 module.exports = router;