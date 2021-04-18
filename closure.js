function ReactItself(){
   
    const closedOverVariable = "I'm in outer!"

    const inner = function CompWithState(){
        console.log(closedOverVariable);
    }

    return inner;
}

const fnction = ReactItself();
//Prints "I'm in outer!"
fnction();