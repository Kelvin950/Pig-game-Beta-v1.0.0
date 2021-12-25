



const socket= io.connect("http://localhost:8080", {
    query:{
        username:username
    }
});
let userID ;

// socket.on("connect" , ()=>{
//     console.log(socket.id);
//     userId =  socket.id;
//     socket.emit("id" , {data:userID})
// })




socket.on("userSconnected" ,data=>{

    
    console.log(data.names);
   let {names} =  data
   names =  names.filter(name=>name !== username)
   console.log(names);
   document.querySelector(".usersonline").innerHTML =  ""
     
   names.forEach(name=>{
    document.querySelector(".usersonline").innerHTML +=  `<li>${name}</li>`

   })
   

})

document.querySelector(".usersonline").addEventListener("click" , (e)=>{
    
  console.log(e.target.innerHTML);

  socket.emit("name" , {
    name:e.target.innerHTML
 })
})

socket.on("hello" , data=>{
    console.log(data);
})


function click(e){
    console.log(e.target);
     console.log(player);
        socket.emit("roll" ,{
            player:player 
        }
        )
    
       
    
    }

    function Hold(e){
        console.log(e.target);
        console.log(player);
        socket.emit("hold" , {
            player:player
        })  
    }


    socket.on("hold" , data=>{
        console.log(data);
        player =  data.players.find(player=>player.name === username);
        console.log(player);
        // console.log(data.username);
        draw(data.players);
    })

socket.on("roll" , data=>{

    console.log(player);
    console.log(data);
    // console.log(UserScore);
   
document.querySelector("img").src=  `img/${data.diceSrc}`
document.getElementById(`current--${players.findIndex(player=>player.currentPlayer === true)}`).textContent =  data.score;
    //   document.querySelector(`#current--${players.findIndex(player=>player.currentPlayer === true)}`).textContent =  data.score  
    //   console.log(diceEl);  
});

socket.on("playerDetails" , data=>{
    if(data.players.length<2){
        return
    }else{
        // players  = data.players;

        // console.log(players);
        // document.querySelector("main").innerHTML = "";
        // document.querySelector("main").insertAdjacentHTML("afterbegin" , setMain(players , player ))
        // document.querySelector(".btn--roll").addEventListener("click" ,click);
        draw(data.players)
    }
       
    
})

socket.on("gamePlayer" , (data)=>{
    console.log(data);
    player = data.data ; 
    UserScore=document.getElementById(`#name--${player.name}`);
})

socket.on("switch" , data=>{
    console.log(data);
    player =  data.players.find(player=>player.name === username);
    console.log(player);
    console.log(data.username);
    draw(data.players)
})

