const {io} =  require("../server");
const Player=  require("./Player")
const Dice=  require("./dice")

const players =  []
const {addClientToMap , switchPlayer , hold ,removeClientFromMap} = require("./RandomLetter")
const newDice =  new Dice();
const userSocketIdMap =  new Map();

io.on("connection" , socket=>{

   const {username} = socket.handshake.query;

//    const newPlayer=  new Player(username , 0); 
//     players.push(newPlayer);
  
 
   addClientToMap(socket.id , username , userSocketIdMap);
   
 let names =  Array.from(userSocketIdMap.keys());
 let numOfSocketsConnected=  io.engine.clientsCount;
 console.log(numOfSocketsConnected);
  io.emit("userSconnected" , {

    names:names,
    usersOline:numOfSocketsConnected
  });

  
console.log(players);
// let dice = 5 ;
// let score =6
let room =  "";
let gamePlayer ;
socket.on("name" , (data)=>{
    
 
    console.log(userSocketIdMap.get(data.name));
    room= `${userSocketIdMap.get(data.name)}${userSocketIdMap.get(username)}`
socket.join(`${userSocketIdMap.get(data.name)}${userSocketIdMap.get(username)}` );
   io.to(`${userSocketIdMap.get(data.name)}${userSocketIdMap.get(username)}`).emit("hello" , {data:"hello"});
gamePlayer= new Player(username ,0);

players.push(gamePlayer);
if(players.length >1)players[1].currentPlayer = false ;
socket.emit("gamePlayer" , {
   data:gamePlayer
})
console.log(players);
io.to(room).emit("playerDetails" , {
   players:players, 

})
})




socket.on("roll" , (data)=>{
 
   const {player} =  data;
   console.log(player);
    newDice.generateRandomNumber();
    let dice =  newDice.getDice();
     newDice.setSrc();
     let diceSrc =  newDice.getSrc();
        let gPlayer =  players.find(player1=> player1.name === player.name);
        gPlayer.currentScore += dice;
        console.log(dice);
          if(dice ===1){

            switchPlayer(players);
          
            console.log(players ,21);
            io.to(room).emit("switch" , {
               players:players ,
               // currentPlayer: players.find(player=>player.name === username),
               username:username
            })
          }

   io.to(room).emit("roll" , {
      diceSrc:diceSrc , score: gPlayer.currentScore
   })
      
 

})
  

socket.on("hold" , data=>{
        
   hold(players) ;
   io.to(room).emit("hold" , {
      players:players,
   })

})

  
socket.on("disconnect" , ()=>{
   removeClientFromMap(socket.id , username , userSocketIdMap);
   
   let names =  Array.from(userSocketIdMap.keys());
   let numOfSocketsConnected=  io.engine.clientsCount;
   // console.log(names , numOfSocketsConnected);
   // console.log("a user left");
   // console.log(io.engine.clientsCount);
   io.emit("userSconnected" , {

      names:names,
      usersOline:numOfSocketsConnected
    });
  
})
})


module.exports=  io;