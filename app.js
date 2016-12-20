// users to get
var users = [1, 2];

// API url
var root = 'https://jsonplaceholder.typicode.com';

// function to create tables with user and album data
function createTables(id) {
  // get user data
  $.ajax({
    url: root + '/users',
    method: 'get',
    data: {
      "id": id
    }
  }).then(function(data) {
    // console.log('* GET root/users/' + id + ' ajax call => ', data);
    // create table div for user
    $('#user-tables').append('<div class="table-wrapper"><div class="table-name">' + data[0].name + '\'s Albums</div><div class="table-heading"><div class="album-id">ID</div><div class="album-title">Title</div></div><div id="table' + data[0].id + '" class="table-body" ondragover="allowDrop(event)" ondrop="drop(event)"></div></div>');
  }).then(function() {
    // get album data
    $.ajax({
      url: root + '/albums',
      method: 'get',
      data: {
        "userId": id
      }
    }).then(function(data) {
      // console.log('* GET root/albums?userId=' + id + ' ajax call => ', data);
      // append each album to respective user tables
      for (var i = 0; i < data.length; i++) {
        $('#table' + data[i].userId).append('<div id="album' + data[i].id + '" class="table-row" draggable="true" ondragstart="drag(event)"><div class="album-id">' + data[i].id + '</div><div class="album-title">' + data[i].title + '</div></div>');
      }
    });
  })
}

// implement drag and drop
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  // console.log('* drop(ev) called =>', ev);
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  /* update 'userId' property on the album when dropped onto another table
      when album moved from table 1 to table 2, ev.path.length == 10;
      when album moved from table 1 to table 2, ev.path.length == 9;
      could not figure out why */
  if (ev.path.length == 10) {
    var newUserId = (ev.path[2].id).slice(5);
  } else if (ev.path.length == 9) {
    var newUserId = (ev.path[1].id).slice(5);
  }
  // console.log('newUserId => ', newUserId );
  $('#' + data).hide();
  var albumId = data.slice(5);
  $.ajax({
    url: root + '/albums/' + albumId,
    method: 'patch',
    data: {
      userId: newUserId
    }
  }).then(function(data) {
    // console.log('* PATCH root/albums/' + albumId + '?userId=' + newUserId, data);
    // append dropped album to new table & alert user
    $('#table' + data.userId).append('<div id="album' + data.id + '" class="table-row" draggable="true" ondragstart="drag(event)"><div class="album-id">' + data.id + '</div><div class="album-title">' + data.title + '</div></div>');
    alert('Album "' + data.title + '" successfully moved.')
  });
}

// call createTables() for each user to initially load page
function run() {
  for (var i = 0; i < users.length; i++) {
    createTables(users[i]);
  }
}

run();
