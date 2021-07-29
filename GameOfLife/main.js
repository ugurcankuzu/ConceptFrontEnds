function RandomInt(min,max){
    return Math.floor(Math.random() * (max-min+1)+min);
}



var user;
class User{
    constructor(username){
        this.username = username;
        this.health = 100;
        this.energy = 100;
        this.money = 0;
        this.job = 'homeless';
    }
}
function getUsername() {
    if((document.querySelector('input').value === "")){    
        alert("You can't live without a name! Go and Get yourself one");
    }else{
        var username;
        username = document.querySelector('input').value;
        user = new User(username);
        window.location.href = 'file:///Users/ugurcan/Desktop/portfolioProjects/GameOfLife/game.html'
    }
}



