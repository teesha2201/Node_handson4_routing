const array = []; //dataBase
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const secret_key = 'prepbytes';

const register = (req,res)=>{
   
    const data = req.body;
    // console.log(data);
    // Condition check before push into array that emaild id is already there or not if yes then don't push it
    const details = array.find((item)=>{
        // console.log(item,"returning before item")
        if(item.email===data.email)
        {
            // console.log(item,"inside if condition")
            return item;
        
        }
    })
    console.log(details)
    if (details){
        return res.send({msg:"user with this email-id has already Registered"})
    }
    // for encrypting your password
    // const salt = bcrypt.genSaltSync(10);
    // console.log(salt);
    const hashPassword = bcrypt.hashSync(data.password,10); 
    // console.log(hashPassword);

    const tempobj = {
        name:data.name,
        email:data.email,
        password:hashPassword,
        phoneNo:data.phoneNo,

    }
    array.push(tempobj);
    const token = jwt.sign({useremail:data.email},secret_key,{expiresIn:"4 d"}) 
    // res.send(array)
   return res.send({msg:'Registered Successfully',token:token,array:array})
}
const login = (req,res)=>{
    
    const logindata = req.body;
    const loginDetail = array.find((item)=>{
        if(item.email===logindata.email) 
        {
            // console.log(item)
            return item;
        }
    })
    if(loginDetail){
        const validate = bcrypt.compareSync(logindata.password,loginDetail.password)
        if(validate)
            {
                const token = jwt.sign({useremail:logindata.email},secret_key,{expiresIn:"4 d"}) 
                // console.log("Login-Detalis: " ,logindata)
                return res.send({msg:'User Successfully LoggedIn ...',token:token,array:array})
            }
            else
            {
                return res.send({msg:'Password is Incorrect'})
            }    
    }
    else
    {
        return res.send({msg:'email is not Registered'})
    }
}

module.exports = {register,login}