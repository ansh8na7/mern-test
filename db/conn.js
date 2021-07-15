require('dotenv').config();
const mongoose = require('mongoose');

const DB = process.env.DB_ACCESS_URL;


mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("mongo connected");
}).catch(()=>{
    console.log("mongo connection failed!");
});
