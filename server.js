const express =  require("express");
const app  = express();
const socketio= require("socket.io");


app.use(express.static(__dirname+"/public"));

const expressServer =  app.listen("8080" , ()=>{
    console.log("http://localhost:8080");
});

const io =  socketio(expressServer);

module.exports= {
    io:io , 
    app:app
}