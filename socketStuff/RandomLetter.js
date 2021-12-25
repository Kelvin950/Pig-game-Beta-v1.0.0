



exports.addClientToMap =  (socketid , username , userSocketIdMap)=>{

    if(!userSocketIdMap.has(username)){
            userSocketIdMap.set(username , new Set([socketid]));
    }
    else{
        userSocketIdMap.get(username).add(socketid)
    }
}

exports.removeClientFromMap =  (socketid , username , userSocketIdMap)=>{

    if(userSocketIdMap.has(username)){
        let userSocketIdSet  = userSocketIdMap.get(username);
        userSocketIdSet.delete(socketid);

        
if(userSocketIdSet.size ===0){

    userSocketIdMap.delete(username);
}
    }



}

exports.switchPlayer = ( players)=>{
  
    let currentPlayer  = players.find(player => player.currentPlayer === true) ; 
    let  otherPlayer =  players.find(player => player.currentPlayer !== true);
      currentPlayer.currentScore =   0 ;
  
      currentPlayer.currentPlayer =  false ; 
         otherPlayer.currentPlayer =  true;
console.log(players);
      
  

}


exports.hold =  (players)=>{

    let currentPlayer  = players.find(player => player.currentPlayer === true) ; 
    let  otherPlayer =  players.find(player => player.currentPlayer !== true);
    
    currentPlayer.setScore();
      currentPlayer.SetcurrentScore();
  
      currentPlayer.currentPlayer =  false ; 
         otherPlayer.currentPlayer =  true;
console.log(players);
}