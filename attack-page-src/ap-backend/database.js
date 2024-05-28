
const mongo = require("mongoose");
const connection = "mongodb://root:s3nz0r.DATA@feta5.fit.vutbr.cz:27017";

class db {
    
    constructor(){
        this.SensorDataSchema = new mongo.Schema({
            readingID: Number,
            elapsedTime: Number,
            predictions: [{ t: Date, pred: String }],
            sensorData: 
            {
                acce: [{t: Number, x: Number, y: Number, z: Number}],
                gyro: [{t: Number, x: Number, y: Number, z: Number}],
                magnet: [{t: Number, x: Number, y: Number, z: Number}]
            }
        })
        this.SensorDataModel = new mongo.model('activity-recognition-logs', this.SensorDataSchema);
        this.dbo
        this.SensorDataCollection
    }
    
    connect(){
        const interval = setInterval(() => {
            mongo
            .connect(connection, { 
                useNewUrlParser: true,
                useUnifiedTopology: true, 
                family: 4})
            .then(() => {
                console.log("connected successfully!");
                clearInterval(interval);
            })
            .catch((err) => {
                console.log("connecttion failed!", err);
                console.log('Next attempt in 5 secconds.')
            });
        }, 5000);         

    }

    async insertSensorData(payload, prediction){
        this.SensorDataModel.updateOne({ readingID: payload.readingID },{
            readingID: payload.readingID,
            elapsedTime: payload.elapsedTime,
            $addToSet:{
                'predictions': { t: payload.elapsedTime, pred: prediction },
                'sensorData.acce': {$each: payload.acce},
                'sensorData.gyro': {$each: payload.gyro},
                'sensorData.magnet': {$each: payload.magnet}
            }
        },{ upsert: true }).then(console.log).catch(console.log);
        
    }

}

module.exports = db;