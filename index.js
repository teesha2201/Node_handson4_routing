const express = require("express");
const app = express();
const port = 5001;
const userRouting = require('./routing/userRouting');
const cors = require('cors')
const auth  =require("./middleware/auth")
// const bodyParser = require('body-parser')  //it is deprecated now
// app.use(bodyParser())
app.use(cors({
    origin:"*"
}))
app.use(express.json()) //same as body-parser
// app.use(auth)
app.use('/api',userRouting)

app.get("/api",auth,(req,res)=>{
    res.send('Server is fine')
})

app.listen(port,()=>{
    try{
        console.log(`server is running on port no. ${port}`)
    }
    catch(err)
    {
        console.log(`Server is not live getting error ${err}`)
    }
})