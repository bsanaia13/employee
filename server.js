const express = require('express');
const app = express();
const pg = require('pg');
const multer = require('multer');
const path = require('path');
const readXlsxFile = require('read-excel-file/node');

app.use(express.json(), express.static(__dirname));


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
  client.query(`INSERT INTO employee(name, lastName, idNumber, birthDay, nationality, salary, currency, mobile)
   VALUES('${req.body.name}', '${req.body.lastName}', '${req.body.idNumber}', 
   '${req.body.birthDay}', '${req.body.nationality.name}', '${req.body.salary}',
    '${req.body.currency}', '${req.body.mobile}')`,
    function (err, result) {
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

app.post('/edit', (req, res) => {
  console.log(req.body);
  client.query(`UPDATE employee
              SET name='${req.body.name}',
              lastName='${req.body.lastName}',
              idNumber='${req.body.idNumber}',
              birthDay='${req.body.birthDay}',
              nationality='${req.body.nationality}',
              salary='${req.body.salary}',
              currency='${req.body.currency}',
              mobile='${req.body.mobile}'
               WHERE id=${req.body.id};`
  );
  client.query(`SELECT * FROM employee where id=${req.body.id}`, (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    res.send(result.rows);
  });
});

// FILE UPLOAD

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/uploads/'))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

let upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res, next) => {
  const file = req.file;
  // READ EXCEL FILE
  readXlsxFile(file.path).then((rows) => {
    for (let i = 1; i < rows.length; i++) {
      client.query(`INSERT INTO employee(name, lastName, idNumber, birthDay, nationality, salary, currency, mobile)
       VALUES('${rows[i][0]}', '${rows[i][1]}', '${rows[i][2]}', 
       '${formatDate(rows[i][3])}', '${rows[i][4]}', '${rows[i][5]}',
        '${rows[i][6]}', '${rows[i][7]}')`,
            function (err, result) {
              if(err) {
                return console.error('error running query', err);
              }
              console.log(result);
            });
    }
  });
  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error)
  }
  res.send(file)
});

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('-');
}


// SERVER RUNNING
app.listen(5000, () => {
  console.log(`Serving running at http://127.0.0.1:5000`);
});

