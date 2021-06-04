
/*
SETUP:

npm i socket.io
npm i express

then


-------------


-------------

put this to your start.js
    modules: [
        "express",
	"http",
	"socket.io"
    ]
finished!*/


//--GET MODULE CALLS--//

var app = getModule('express')();
var server = getModule('http').Server(app);
var io = getModule('socket.io')(server);

//--CONFIG--//

let noIp = true; /*purpose of this is if you dont want use ip adresses of the players for extra security of the system 
if you disable this well people can change user and control anyone
this system needs ips to prevent people control other people s accounts*/
let limitUser = 555; //limit of the Bricktale users can be on your server same time
//--CODE--//



// Z is the up vector
class plr{

    constructor(user,ip){
        this.user = user; //a identificator
        this.ipv4 = ip; //to be sure if that person using the account
        this.plr = new Bot(user); //not really a bot just, npc entity for adding players xd
        Game.newBot(this.plr);
        
    }
    

}
//no ip version
class plrIP{

    constructor(user){
        this.user = user;
        this.plr = new Bot(user); //check the comment on other version of the class

    }
}
let players = [new plr("Admim")];

Game.on("playerJoin", (player) => {
    player.on("initialSpawn", () => {
       

    })
 })


io.on('connection', function(socket) {
    socket.on('addplr', function(data) {
        let user = data.user;

        
        //put ip addres for extra security of the service
        if(noIp == false){
            var address = socket.handshake.address;//        
            let ip = address.address
            //add player info to the players array
            //to find npcs
            player.push(new plr(user,ip));
        }else{
            //insecure method
            //recomended is using ips
            //use this if u addicted to privacy something like that
            player.push(new plrIP(user));
        }.
    });
    socket.on('pos', function(data) {
        let pos = players.indexOf(data.user)
        let X = data.x;
        let Y = data.y;
        let Z = data.z;
        players[pos].plr.Position = new Vector3(X,Y,Z);
       // console.log( );

    });
    socket.on('getMAP', function(data) {
 
       let bricksdt = JSON.stringify(world.bricks);
       socket.emit('map'+data.user, { map:  bricksdt});

    });    
});
server.listen(80);
