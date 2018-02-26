// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Set up the Express App
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var reservations = [];
var waitList = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/view', function(req, res) {
  res.sendFile(path.join(__dirname, 'view.html'));
});

app.get('/add', function(req, res) {
  res.sendFile(path.join(__dirname, 'add.html'));
});

// See all table reservations
app.get('/api/:reservations?', function(req, res) {
  var table = req.params.reservations;

  if (table.length < 5) {
    console.log(table);
    for (var i = 0; i < reservations.length; i++) {
      if (table === reservations[i].routeName) {
        return res.json(reservations[i]);
      }
    }

    return res.json(false);
  }
  return res.json(reservations);
});

// See all wait list
app.get('/api/:waitList?', function(req, res) {
  var waitTable = req.params.waitList;

  if (waitTable) {
    console.log(waitTable);

    for (var i = 0; i < waitList.length; i++) {
      if (waitTable === waitList[i].routeName) {
        return res.json(waitList[i]);
      }
    }

    return res.json(false);
  }
  return res.json(waitList);
});

app.post('/api/add', function(req, res) {
  var newTable = req.body;

  newTable.routeName = newTable.name.replace(/\s+/g, '').toLowerCase();

  console.log(newTable);

  reservations.push(newTable);

  res.json(newTable);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log('App listening on PORT ' + PORT);
});
