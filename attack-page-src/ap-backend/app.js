const express = require('express');
const app = express();
const port = 3000;
const db = new (require('./database.js'));
const predict = new (require('./predict.js'));
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

async function receiveData(req, res){
const payload = req.body;
const prediction = await predict.modelEvaluation(payload);
db.insertSensorData(payload, prediction[0]);
res.json({
    message: 'Received',
    result: prediction[0]
})
}

module.exports = app;