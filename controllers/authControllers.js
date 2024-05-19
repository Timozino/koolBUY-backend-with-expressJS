
const adminModel = require('../models/adminModel')
const { responseReturn } = require('../utils/response')
const bycrypt = require('bcrypt')
const { createToken } = require('../utils/tokenCreate')
const { response } = require('express')

class authControllers{
    
    
    staff_login = async(req, res)=>{
        //console.log(req.body)
        const {email, password} = req.body

        try {
            const admin = await adminModel.findOne({email}).select('+password')
        //    console.log(admin);
        if (admin) {
            const match = await bycrypt.compare(password, admin.password)
            //console.log(match)
            if (match) {
                const token = await createToken({
                    id : admin.id,
                    role : admin.role
                })
                res.cookie('accessToken', token, {
                    expires : new Date(Date.now() + 7*24*60*60*1000)
                })
                responseReturn(res,200,{token, message: "Login Successful"})
                
            } else {
                responseReturn(res, 404, {error : "Wrong Password"})
            }
            
        } else {
            responseReturn(res,400,{error:"Email not in our Database"})
            console.log(responseReturn.data)
        }
        } catch (error) {
            //console.log(error.message)
            responseReturn(res,500,{error:error.message})
            
        }
    }
    // End of Method

    getUser = async (req, res) => {
        const {id, role} = req;

        try {
            if (role === 'staff') {
                const user = await adminModel.findById(id)
                responseReturn(res, 200, {userInfo:user})

            }else{
                console.log('Seller info')
            }
        } catch (error) {
            console.log(error.message)
        }
    }// end of getUser Method
}

module.exports=new authControllers()