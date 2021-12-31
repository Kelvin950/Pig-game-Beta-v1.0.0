



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
// console.log(location.href);
// console.log(location.pathname);
    if(location.pathname==="/"){
        console.log(data);
    
    console.log(data.names);
   let {names} =  data
   names =  names.filter(name=>name !== username)
   console.log(names);
chatBox.innerHTML =  ""
     const html =  ` <h4>
     Online (${data.usersOline}) <button class="drop"><i class="fas fa-sort-down"></i></button>
 </h4>
   <ul>  
      ${names.map(name=>{
       return  `<li class="li">${name}</li>`
      }).join(" ")}
   </ul>`

   chatBox.innerHTML = html;
    }
else{
    console.log("dsd");
    console.log(players);
}
 

})

if(location.pathname==="/"){
    chatBox.addEventListener("click" , (e)=>{
    
       
        if(!e.target.classList.contains("li"))return;
        console.log(e.target.innerHTML);
    //    console.log(e.target.srcElement);
        socket.emit("invite" , {
            name:e.target.innerHTML,
            sender:username
        } , ()=>{
            console.log("invitation sent to" , e.target.innerHTML);
        })
})
//   socket.emit('sendMessage', message, (error) => {
//     if (error) {
//     return console.log(error)
//     }
//     console.log('Message delivered!')
//    })


}

socket.on("invitation" ,data=>{
    console.log(data);
    index.classList.remove("hidden");
    invitationUl.innerHTML+= ` <li>
   ${data.from.sender} sent you an invite <button class="decline">decline</button> <button class="accept">accept</button>

</li>`

document.querySelectorAll(".decline").forEach((button)=>{

    button.addEventListener("click" ,e=>{
        console.log(e.target);
    console.log(e.target.parentElement);
    e.target.parentElement.parentElement.removeChild(e.target.parentElement)
    })

})

document.querySelectorAll(".accept").forEach((button)=>{
    button.addEventListener("click" ,e=>{
        console.log(e.target);
    console.log(e.target.parentElement);
    console.log("accept");

    socket.emit("joined" , {id:data.from.id ,sender:data.from.sender})
    })
})

  
})
// invitationUl.addEventListener("click" , (e)=>{
//     if(e.target.classList.contains(`${data.from.sender}`)){

//         console.log(e.target);
//        }
    
   

//     // e.target.parentElement.classList.add("hidden");


// })

// })

window.addEventListener("load" , ()=>{
    if(location.pathname ==="/game.html"){
        console.log("dkf");
        console.log(location.search);
        const room =  location.search.split("=")[1];
        console.log(room);
        
        socket.emit("joinedGame" , {
           
            room:room
        })
        // socket.on("gamePlayer" , (data)=>{
        //     console.log(data);
        //     player = data.data ; 
        //     console.log(player);
        //     UserScore=document.getElementById(`#name--${player.name}`);
        // })
        socket.on("drawGame" , data=>{
            console.log(data);
            players = data.players;
                  console.log(player);
            draw(players)
            console.log(players);
        })

    }
})

// document.addEventListener("")

socket.on("hello" , data=>{
    console.log(data);
})


function click(e){
    console.log(e.target);
     console.log(player);
        socket.emit("roll" ,{
            player:player ,
            room: location.search.split("=")[1]
        }
        )
    
       
    
    }

    function Hold(e){
        console.log(e.target);
        console.log(player);
        socket.emit("hold" , {
            player:player,
            room: location.search.split("=")[1]
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

socket.on("changeLocation" , data=>{
    if(data.players.length<2){
        return;
    }else{
        // players  = data.players;

        // console.log(players);
        // document.querySelector("main").innerHTML = "";
        // document.querySelector("main").insertAdjacentHTML("afterbegin" , setMain(players , player ))
        // document.querySelector(".btn--roll").addEventListener("click" ,click);
  
        location.href=`/game.html?room=${data.players[0].room}`;
      
    }
       
    
})

socket.on("gamePlayer" , (data)=>{
    console.log(data);
    player = data.data ; 
    console.log(player);
    UserScore=document.getElementById(`#name--${player.name}`);
})

socket.on("switch" , data=>{
    console.log(data);
    player =  data.players.find(player=>player.name === username);
    console.log(player);
    console.log(data.username);
    draw(data.players);

})


// socket.on("usersConnected" , data=>{
//     console.log(data);
// })


socket.on("playerLeft" , (data)=>{
    console.log(data);
});