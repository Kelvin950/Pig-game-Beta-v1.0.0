

class Player{
    constructor(name , score ){
        this.name=  name ;
        this.score =  0;
        this.currentScore =  score;
        this.id =  "";
        this.currentPlayer =true;
    }

    SetcurrentScore(){
        this.currentScore= 0 ;
    }

    setScore(){
        this.score += this.currentScore;
    }

    getScore(){

        return this.score;
    }

    getName(){
        return this.nameame;
    }
}


module.exports=Player