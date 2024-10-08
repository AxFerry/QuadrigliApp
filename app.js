import { Server } from "socket.io";
import  express from "express" ;
import { createServer } from "http";
import {  fileURLToPath } from "url";
import { dirname ,join} from "path";
import  {Chess} from "chess.js"



const app = express();
const server = createServer(app);
const io = new Server(server);
const __dirname = dirname(fileURLToPath(import.meta.url));

let users =[]
let team1 =[]
let team2 = []
let rooms = []

// access to all directory
app.use(express.static('pub'))

class Room {
     constructor(id){
          this.id = id;
          this.users= [];
     }
}


var game = new Chess();

function isLegal(source, target, piece){
     if (game.game_over()) return false

     // only pick up pieces for the side to move
     if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
         (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
       
       return false
     }
   
   var move = game.move({
     from: source,
     to: target 
})
    console.log(move)
   
   
   if (move === null) {return false}
   else {return true}

   
   
}

     
     io.on('connection',socket => {
          

          console.log(socket.id)
          
          socket.on('join serv', (username )=>{
               const user = {
                    username ,
                    id : socket.id
               };
               users.push(user)
               console.log(users);
               io.emit("new user" , users );
          })
          socket.on('create room', function(){
               const roomId = Math.random()*20000
               const room= new Room(roomId)
               socket.join(roomId);
               rooms.push(roomId);
               console.log(rooms);
             


          })
          socket.on('join room',(roomname ) =>{
               socket.join(roomname);
               
               
          })
          
          socket.on('move' , data => {
              
               console.log(data)
              // chess.move(data)
              let source= data.slice(3,-3)
              let target= data.slice(6)
              let piece = data.slice(0, -6)
              console.log(source)
              console.log(target)
              console.log(piece)

              if (isLegal(source , target ,piece) === true ){
                   console.log('la mossa è valida')
               socket.broadcast.emit('move' , data)
               
              }
              else{
                 console.log('non puoi farlo')
                 socket.emit('illegal' , data)
              }
     
          })
     })
     








server.listen(2000);