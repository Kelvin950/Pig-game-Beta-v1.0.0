



exports.addClientToMap =  (socketid , username , userSocketIdMap)=>{

    if(!userSocketIdMap.has(username)){
            userSocketIdMap.set(username , new Set([socketid]));
    }
    else{
        userSocketIdMap.get(username).add(socketid)
    }
}


exports.switchPlayer = ( players)=>{
  
    let currentPlayer  = players.find(player => player.currentPlayer === true) ; 
    let  otherPlayer =  players.find(player => player.currentPlayer !== true);
      currentPlayer.score =   0 ;
  
      currentPlayer.currentPlayer =  false ; 
         otherPlayer.currentPlayer =  true;
console.log(players);
      
  

}