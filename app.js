function allowDrop(ev) {

  ev.preventDefault();

}

function drag(ev) {

  ev.dataTransfer.setData("text", ev.target.id);
  console.log(ev.target.id);

}

function drop(ev) {

  ev.preventDefault();

  var data = ev.dataTransfer.getData("text");

  ev.target.appendChild(document.getElementById(data));

  console.log(ev);

  // $.ajax('http://jsonplaceholder.typicode.com/albums/' + data, {
  //   method: 'PATCH',
  //   data: {
  //     userId:
  //   }
  // }).then(function(data) {
  //   console.log(data);
  // });

}

var root = 'https://jsonplaceholder.typicode.com';

// get and display names of user 1 & user 2
$.ajax({
  url: root + '/users',
  method: 'GET'
}).then(function(data) {

  var user1 = $.grep(data, function(e) {
    return e.id == 1;
  });

  var user2 = $.grep(data, function(e) {
    return e.id == 2;
  });

  var users = [];

  users.push(user1[0], user2[0]);

  $('#user1').append('<div class="tableTitle"><h3>' + users[0].name + '</h3><span class="hidden">' + users[0].id + '</span></div>');
  $('#user2').append('<div class="tableTitle"><h3>' + users[1].name + '</h3><span class="hidden">' + users[1].id + '</span></div>');

});

// get and display albums of user 1 & user 2
$.ajax({
  url: root + '/albums',
  method: 'GET'
}).then(function(data) {

  var user1albums = $.grep(data, function(e) {
    return e.userId == 1;
  });

  var user2albums = $.grep(data, function(e) {
    return e.userId == 2;
  });

  for (i = 0; i < user1albums.length; i++) {
    $('#user1').append('<div id="' + user1albums[i].id + '" class="tableItem" draggable="true" ondragstart="drag(event)"><span>' + user1albums[i].id + '</span> <span>' + user1albums[i].title + '</span>');
  }

  for (i = 0; i < user2albums.length; i++) {
    $('#user2').append('<div id="' + user2albums[i].id + '" class="tableItem" draggable="true" ondragstart="drag(event)"><span>' + user2albums[i].id + '</span> <span>' + user2albums[i].title + '</span>');
  }

});
