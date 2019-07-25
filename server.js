const express = require('express');
const app = express();
const pg = require('pg');

app.use(express.json());


app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// DATABASE CONNECTION
const conString = "postgres://qkybjzur:vmYnedVgBH1qiUYbiaNhMHn3QRVv5CI6@raja.db.elephantsql.com:5432/qkybjzur";
const client = new pg.Client(conString);

client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
});


// ADD EMPLOYEE INTO DATABASE
app.post('/add', (req, res) => {
  console.log(req.body);
  client.query(`INSERT INTO employee(name, lastName) VALUES('${req.body.name}', '${req.body.lastName}')`, function (err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result);
  });
  // client.end();
});

app.get('/get', (req, res) => {
  client.query(`SELECT * FROM employee`, (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    res.send(result.rows);
  });
  // client.end();
});

// SERVER RUNNING
app.listen(5000, () => {
  console.log(`Serving running at http://127.0.0.1:5000`);
});

