// $(document).ready(function() {
  // users to get
  var users = [1, 2];

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
      console.log('getUser() called => ', data);
      // create table div for user
        $('#user-tables').append(
        '<div id=' + id + ' ondragover="allowDrop(event)" ondrop="drop(event)" class="table-wrapper"><div class="table-name">'
        + data[0].name + '</div><div class="table-heading"><div class="album-id">ID</div><div class="album-title">Title</div></div><div id="table' + id + '" class="table-body"></div></div>');
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
      console.log('getAlbums() called => ', data);
      // append albums to user tables
      for (var i = 0; i < data.length; i++) {
        $('#table' + userId).append('<div id="album' + data[i].id + '" class="table-row" draggable="true" ondragstart="drag(event)"><div class="album-id">' + data[i].id + '</div><div class="album-title">' + data[i].title + '</div></div>');
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
    console.log('ev.target => ', ev.target);
    console.log('data => ', data);
    // update 'userId' property on the album when dropped onto another table
    var albumId = data.slice(5);
    console.log('ev.path[2].id', ev.path[2].id);
    var newUserId = (ev.path[2].id);
    console.log('newUserId => ', newUserId);
    $.ajax('http://jsonplaceholder.typicode.com/albums/' + albumId, {
      method: 'patch',
      data: {
        userId: newUserId
      }
    }).then(function(data2) {
      console.log('data2', data2);
      console.log('drop(ev) called =>', data2.userId);
      getAlbums(data2.userId)
    });
  }

// get users and albums
for (var i = 0; i < users.length; i++) {
  // console.log('users[i] => ', users[i]);
  getUser(users[i]);
  console.log('getUser called ' + (i + 1) + ' time(s)');
  getAlbums(users[i]);
  console.log('getAlbums called ' + (i + 1) + ' time(s)');

}

// }); // end document ready
