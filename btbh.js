
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

let noIp = false; /*purpose of this is if you dont want use ip adresses of the players for extra security of the system 
if you disable this well people can change user and control anyone
this system needs ips to prevent people control other people s accounts*/
let limitUser = 555; //limit of the Bricktale users can be on your server same time
//--CODE--//



// Z is the up vector
class plr{

    
    constructor(user,ip){
        const dth =  new Bot(user);
        this.user = user; //a identificator
        this.ipv4 = ip; //to be sure if that person using the account
         //not really a bot just, npc entity for adding players xd this.dth =  ;
        Game.newBot(dth);//plr
        
    }


}
// no ip version if u value privacy but not the security bruh
class plrIP{

    constructor(user){
        this.user = user;
        this.plr = new Bot(user); //check the comment on other version of the class

    }
}
var players = [new plr("Admim")];
var keys = []; //im js noob refactor it ples :(

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
            players.push(new plr(user,ip));
            const dth =  new Bot(user);

            Game.newBot(dth);//plr

            //keys.push(user);
        }else{
            const dth =  new Bot(user);

            Game.newBot(dth);
            //insecure method
            //recomended is using ips
            //use this if u addicted to privacy something like that
            players.push(new plrIP(user));
        }
    });
           Game.on("playerJoin", (player) => {
        player.on("initialSpawn", () => {
            const bot = world.bots.find(bot => bot.name === "Bobux!")
            player.position = bot.position;
     })
    })

    socket.on('pos', function(data) {
       // let pos = keys.indexOf(data.user);
        let X = data.X;
        let Y = data.Y;
        let Z = data.Z;
        
      /*  console.log(pos+"X: "+X)
       if(players[pos]>-1)*/
       const bot = world.bots.find(bot => bot.name === data.user)
       
       if(bot != undefined){
       bot.setPosition(new Vector3(-X,-Y,-Z));
       bot.rotation = new Vector3(0,X,0);
       bot.position = new Vector3(X,Y,Z);


       bot.setSpeech("Testing the service")
      // console.log(bot);
       }
    //  players[pos].setPos(new Vector3(X,Y,Z));//.dth.Position = new Vector3(X,Y,Z);
       // console.log( );

    });
    socket.on('getMAP', function(data) {
 
       let bricksdt = JSON.stringify(world.bricks);
       socket.emit('map'+data.user, { map:  bricksdt});

    });    
});
//Client Testing
app.get('/', function (req, res) {
    res.sendFile(__dirname+"/index.html")
})

server.listen(80);
