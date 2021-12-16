

class Player{
    constructor(name , score ){
        this.name=  name ;
        this.score =  score;
        this.id =  "";
        this.currentPlayer =true;
    }

    incrementScore(){
        this.score++;
    }

    deleteScore(){
        this.score =  0
    }

    getScore(){

        return this.score;
    }

    getName(){
        return this.nameame;
    }
}


module.exports=Player