const pool = require('./database');
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3000;

//app instance
const app = express();


app.get('/',async(req,res)=>{
   try{
    const result = await pool.query(`Select * from public.caesars_customers`);
    const customer = result.rows;
    const firstname = customer.map( cust => cust.firstName).toString();
    const lastname = customer.map( cust => cust.lastName).toString();
    return res.status(200).json(`Hello World ${firstname} ${lastname}`);   
  }catch(err){
    console.log(err.message);
  }
})


// Error Handling
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);    //fwd the error req
})

app.use((error,req,res,next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })   
})

app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
})

