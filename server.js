const express =  require("express");
const app  = express();
const socketio= require("socket.io");
const port = process.env.Port || 3000;
const page = "dsffdf";

app.use(express.static(__dirname+"/public"));

const expressServer =  app.listen(port , ()=>{
    // console.log("http://localhost:8");
});

const io =  socketio(expressServer);

module.exports= {
    io:io , 
    app:app
}