usrtag = document.getElementById('username').value
joinGame=document.getElementById('joinGame');
creteGame=document.getElementById('createGame');
conne=document.getElementById('connect');
const socket = io();
socket.on('new user' , data =>{
    console.log(data)
    creteGame.style.visibility = "visible";
    joinGame.style.visibility = "visible";
    conne.style.visibility = "collapse";
})


conne.addEventListener('click', function(){
    
    console.log(usrtag)
    socket.emit('join serv', usrtag )
})


creteGame.addEventListener('click', function(){
    socket.emit('create room')
    window.location.replace('/game.html')
    fetch('http://localhost:2000' ,'POST');
});

joinGame.addEventListener('click', function(){
    socket.emit('joinRoom',{
        code : userTag
    })
    window.location.replace('/game.html')
})