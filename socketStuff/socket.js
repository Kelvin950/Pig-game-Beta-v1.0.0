const {io} =  require("../server");
const Player=  require("./Player")
const Dice=  require("./dice")
let numberOfConnection =  0;
const players =  []
const {addClientToMap , switchPlayer} = require("./RandomLetter")
const newDice =  new Dice();
const userSocketIdMap =  new Map();

io.on("connection" , socket=>{

   const {username} = socket.handshake.query;

//    const newPlayer=  new Player(username , 0); 
//     players.push(newPlayer);
  
 
   addClientToMap(socket.id , username , userSocketIdMap);
   
 let names =  Array.from(userSocketIdMap.keys());
 
  io.emit("userSconnected" , {

    names:names
    
  });

  
console.log(players);
let dice = 5 ;
let score =6
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
        gPlayer.score += dice;
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
      diceSrc:diceSrc , score: gPlayer.score
   })
    

})
  



 
})


module.exports=  io;