const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const AuthRouter= require('./routes/AuthRouter.js')

require("dotenv").config();
require("./models/db.js")

const PORT = process.env.PORT || 8000;
//bodyparser to parse frontend data
app.use(bodyParser.json());
//cors to handle cors policy
app.use(cors());
app.get('/ping',(req,res)=>{
    res.send('PONG');
})
//Router
app.use('/auth',AuthRouter);
//start server from express
app.listen(PORT,()=>{
    console.log(`server started at port no ${PORT}`);
})