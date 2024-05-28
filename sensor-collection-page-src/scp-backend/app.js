const express = require('express');
const app = express();
const port = 3000;
const db = new (require('./database.js'));
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(cors({origin: '*'}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Backend running');
});

db.connect();

app.post('/data', receiveData)
app.post('/delete', cancelData)

function receiveData(req, res){
const payload = req.body;
db.insertSensorData(payload);
res.status(200).json({
    message: 'Received'
})
}

function cancelData(req, res){
  const payload = req.body;
  console.log(payload);
  db.cancelSensorData(payload);
  res.status(200).json({
      message: 'Received'
  })
  }
module.exports = app;