
const drop =  document.querySelector(".drop");
const ul  = document.querySelector(".usersOnline ul");
const chatBox=  document.querySelector(".usersOnline")
const modal = document.querySelector(".modal");
const overlay =  document.querySelector(".overlay");
const howButton =  document.querySelector(".how button")
chatBox.addEventListener("mouseenter" , (e)=>{

    // console.log(chatBox.getBoundingClientRect());
    // console.log(ul.getBoundingClientRect());
    if(chatBox.getBoundingClientRect().height === 30){
        chatBox.style.height =  `${ul.getBoundingClientRect().height}%`
        drop.innerHTML= `<i class="fas fa-sort-up"></i>`
    }
    // else{
    //     chatBox.style.height =  `0.4rem`
    //     drop.innerHTML= `<i class="fas fa-sort-down"></i>`
    // }
    
  
} )

chatBox.addEventListener("mouseleave" , ()=>{
    chatBox.style.height =  `0.4rem`
        drop.innerHTML= `<i class="fas fa-sort-down"></i>`
})

overlay.addEventListener("click" , ()=>{

     modal.classList.add("hidden");
     overlay.classList.add("hidden");

})

howButton.addEventListener("click" , ()=>{
    modal.classList.remove("hidden");
     overlay.classList.remove("hidden");
})
console.log(5);