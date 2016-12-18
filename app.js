// API url
var root = 'https://jsonplaceholder.typicode.com';

// create function to get users
var getUser = function(id) {
  $.ajax({
    url: root + '/users',
    method: 'get',
    data: {
      "id": id
    }
  }).then(function(data) {
    // create table div for user
    $('#userTables').append('<h3 class="tableTitle">' + data[0].name + '</h3><div id=' + id + ' ondrop="drop(event)" ondragover="allowDrop(event)"></div><br>');
  });
}

// create function to get albums
var getAlbums = function(userId) {
  $.ajax({
    url: root + '/albums',
    method: 'get',
    data: {
      "userId": userId
    }
  }).then(function(data) {
    // append albums to user tables
    for (var i = 0; i < data.length; i++) {
      $('#' + userId).append('<div id="album' + data[i].id + '" class="tableItem" draggable="true" ondragstart="drag(event)"><p>' + data[i].title + '</p></div>');
    }
  });
}

// implement drag and drop
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  // update 'userId' property on the album
  var albumId = data.slice(5);
  var newUserId = ev.path[0].id;
  $.ajax('http://jsonplaceholder.typicode.com/albums/' + albumId, {
    method: 'PATCH',
    data: {
      userId: newUserId
    }
  }).then(function(data) {
    console.log('patch =>', data);
  });
}

// get users 1 & 2
getUser(1);
getUser(2);

// get users' 1 & 2 albums
getAlbums(1);
getAlbums(2);
