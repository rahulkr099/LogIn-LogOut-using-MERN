require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const AuthRouter= require('./routes/AuthRouter.js')

require("./models/db.js")

const PORT = process.env.PORT || 8000;
//bodyparser to parse frontend data
app.use(bodyParser.json());
//cors to handle cors policy
app.use(cors({
    origin: 'https://log-in-log-out-using-mern-frontend.vercel.app/', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow cookies/auth headers
}));

// Preflight request handling
app.options('*', cors());
app.get('/ping',(req,res)=>{
    res.send('PONG');
})
//Router
app.use('/auth',AuthRouter);
//start server from express
app.listen(PORT,()=>{
    console.log(`server started at port no ${PORT}`);
})
