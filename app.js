const mongoose = require('mongoose');
const express = require('express');
const path = require("path");
var cookieParser = require('cookie-parser');
const app = express();


app.use(express.json());
app.use(cookieParser());

app.use(require("./router/auth"));

if(process.env.NODE_ENV=="production"){
    app.use(express.static(path.resolve(__dirname, "./client/build")));
    app.get("*", function (request, response) {
        response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
    });
}





const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log("server at port 8000");
});