$(function(){
    $gameForm = $('#connectGameForm');
    $playerNameText = $('#textPlayerName');
    var localPlayerName = localStorage.getItem('playerName');
    $playerNameText.val(localPlayerName);
});

function openGame(playerNameText) {
    if(playerNameText.val()){
        $('#btnConnect').attr('disabled',true);
        localStorage.setItem('playerName',playerNameText.val());
        console.log(window.location);
        var url = '';
        if(window.location.hostname=='localhost'){
            url = 'http://localhost:3000';
        }
        else{
            url = 'http://http://18.219.199.138:3000';
        }
        var socket = io.connect(url);
        
        $('#gameLog').html("You Entered the Game<br>");
        socket.emit('join', playerNameText.val());    
        socket.on('new join', function (data) {
            $('#gameLog').append(data+'<br>');
        });
        socket.on('new roll', function (data) {
            $('#gameLog').append(data+'<br>');
        });
        
    }
    else{
        playerNameText.focus();
    }
}

function diceRoll(playerNameText) {
    var socket = io();
    var data = {};
    data.sides = 20;
    data.roller = playerNameText.val();
    socket.emit('roll', data);
}

function gE(id){
    return $('#'+id);
}
