const {io} =  require("../server");
const Player=  require("./Player")
const Dice=  require("./dice")

const players =  []
const {addClientToMap , switchPlayer , hold ,removeClientFromMap ,addUserIntoARoom , setPlayer1ToCurrentPlayer ,playersInRoom , outputRoom ,leaveRoom} = require("./RandomLetter")
const newDice =  new Dice();
const userSocketIdMap =  new Map();

io.on("connection" , socket=>{

   const {username} = socket.handshake.query;

//    const newPlayer=  new Player(username , 0); 
//     players.push(newPlayer);
  
 
   addClientToMap(socket.id , username , userSocketIdMap);
   // console.log(userSocketIdMap.get(username));
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
// let room =  "";
// let gamePlayer ;
// const f = new Set("kelvin");
// console.log(f.values(""));
socket.on("invite" ,(data,cb)=>{

  const socketid= Array.from(userSocketIdMap.get(data.name));

socket.broadcast.to(socketid[0]).emit("invitation" ,{
    message:"Join my game" ,
    from:{id:socket.id , sender:data.sender}
});

socket.join(`${socket.id}${socketid[0]}`);
const firstPlayer= new Player(username ,0);
firstPlayer.setRoom(`${socket.id}${socketid[0]}`);
firstPlayer.UpdateRoom();
players.push(firstPlayer);
socket.emit("gamePlayer" , {
   data:firstPlayer
});
console.log(players);
// gamePlayer.room =  `${socket.id}${socketid[0]}`;


cb();
    
})



// socket.on('sendMessage', (message, callback) => {
//    const filter = new Filter()
//    if (filter.isProfane(message)) {
//    return callback('Profanity is not allowed!')
//    }
//    io.emit('message', message)
//    callback()
//   })
socket.on("joined" , (data ,cb)=>{
    
// console.log(gamePlayer);
   //  console.log(userSocketIdMap.get(data.name));
   //  room= `${userSocketIdMap.get(data.name)}${userSocketIdMap.get(username)}`
  const  secondPlayer= new Player(username ,0);
secondPlayer.setRoom(`${data.id}${socket.id}`);
secondPlayer.UpdateRoom();
players.push(secondPlayer);
 
const firstPlayer =  players.find(player=>player.getName() === data.sender)
// if(players.length >1)players[1].currentPlayer = false ;
addUserIntoARoom(firstPlayer , secondPlayer);
setPlayer1ToCurrentPlayer(firstPlayer);
socket.join(secondPlayer.getRoom());
   io.to(secondPlayer.getRoom()).emit("hello" , {data:"hello"});

socket.emit("gamePlayer" , {
   data:secondPlayer
})
console.log(players);
io.to(secondPlayer.getRoom()).emit("changeLocation" , {
   players:playersInRoom(secondPlayer.getRoom()), 

});

 
})

io.emit("playerDetails" , {
   players:players, 

});

socket.on("joinedGame" ,({room})=>{
   console.log(room);
  const isPlayerInRoom = playersInRoom(room).find(player=>player.getName()===username);
  if(!isPlayerInRoom){
     return socket.emit("NotInARoom" , "not in a room");
  }  
   socket.join(room);
   socket.emit("gamePlayer" , {
      data:players.find(player=>player.getName() === username)
   })
   playersInRoom(room).forEach(player1=>{
      player1.gameStarted= false;
   });
   console.log(playersInRoom(room));
   io.to(room).emit("drawGame" , {
         players:playersInRoom(room)
   });
} )


socket.on("roll" , (data)=>{
 
   const {player} =  data;
   const {room} =  data
   console.log(room);
  outputRoom()
   const playersIntheRoom=  playersInRoom(room)
   playersIntheRoom.forEach(player=>{
      player.gameStarted= true;
   })
   console.log(playersIntheRoom);
   console.log(player);
    newDice.generateRandomNumber();
    let dice =  newDice.getDice();
     newDice.setSrc();
     let diceSrc =  newDice.getSrc();
        let gPlayer =  playersIntheRoom.find(player1=>player1.getName()===player.name);
        gPlayer.currentScore += dice;
        console.log(gPlayer ,1);
        console.log(dice);
          if(dice ===1){

            switchPlayer(playersIntheRoom);
          
            console.log(playersIntheRoom,21);
            io.to(room).emit("switch" , {
               players: playersIntheRoom,
               // currentPlayer: players.find(player=>player.name === username),
               username:username
            })
          }

   io.to(room).emit("roll" , {
      diceSrc:diceSrc , score: gPlayer.currentScore
   });
      
 

})
  

socket.on("hold" , data=>{
        
   hold(playersInRoom(data.room)) ;
   io.to(data.room).emit("hold" , {
      players:playersInRoom(data.room),
   });

});

  
socket.on("disconnect" , ()=>{

   console.log(players);
   const player = players.find(p=>p.name === username);
   if(player.gameStarted){
          console.log(player,1);
      leaveRoom(player.room ,username);
      
      io.to(player.room).emit("playerLeft" , {player:player});
   }
        
   removeClientFromMap(socket.id , username , userSocketIdMap);
   
   let names =  Array.from(userSocketIdMap.keys());
   let numOfSocketsConnected=  io.engine.clientsCount;
   console.log(numOfSocketsConnected);
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