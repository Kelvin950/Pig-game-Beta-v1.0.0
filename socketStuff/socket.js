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
let room =  "";
let gamePlayer ;
// const f = new Set("kelvin");
// console.log(f.values(""));
socket.on("invite" ,(data,cb)=>{

  const socketid= Array.from(userSocketIdMap.get(data.name));

socket.broadcast.to(socketid[0]).emit("invitation" ,{
    message:"Join my game" ,
    from:{id:socket.id , sender:data.sender}
});

socket.join(`${socket.id}${socketid[0]}`);
gamePlayer= new Player(username ,0);
gamePlayer.setRoom(`${socket.id}${socketid[0]}`);
gamePlayer.UpdateRoom();
players.push(gamePlayer);
socket.emit("gamePlayer" , {
   data:gamePlayer
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
   gamePlayer= new Player(username ,0);
gamePlayer.setRoom(`${data.id}${socket.id}`);
gamePlayer.UpdateRoom();
players.push(gamePlayer);
if(players.length >1)players[1].currentPlayer = false ;
socket.join(gamePlayer.getRoom());
   io.to(gamePlayer.getRoom()).emit("hello" , {data:"hello"});

socket.emit("gamePlayer" , {
   data:gamePlayer
})
console.log(players);
io.to(gamePlayer.getRoom()).emit("changeLocation" , {
   players:players.filter(player=>player.getRoom()===gamePlayer.getRoom()), 

});

 
})

io.emit("playerDetails" , {
   players:players, 

});

socket.on("joinedGame" ,({room})=>{
   console.log(room);
       
   socket.join(room);
   socket.emit("gamePlayer" , {
      data:players.find(player=>player.getName() === username)
   })
   io.to(room).emit("drawGame" , {
         players:players.filter(player=>player.getRoom()===room)
   });
} )


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
            io.to(data.room).emit("switch" , {
               players:players ,
               // currentPlayer: players.find(player=>player.name === username),
               username:username
            })
          }

   io.to(data.room).emit("roll" , {
      diceSrc:diceSrc , score: gPlayer.currentScore
   })
      
 

})
  

socket.on("hold" , data=>{
        
   hold(players) ;
   io.to(data.room).emit("hold" , {
      players:players,
   })

})

  
socket.on("disconnect" , ()=>{
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