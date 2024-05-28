
const mongo = require("mongoose");
const connection = "mongodb://root:s3nz0r.DATA@feta5.fit.vutbr.cz:27017";

class db {
    
    constructor(){
        this.SensorDataSchema = new mongo.Schema({
            readingID: Number,
            activity: String,
            userAgent: String,
            IPaddress: String,
            elapsedTime: Number,
            sensorData: 
            {
                acce: [{t: Number, x: Number, y: Number, z: Number}],
                gyro: [{t: Number, x: Number, y: Number, z: Number}],
                magnet: [{t: Number, x: Number, y: Number, z: Number}],
                grav: [{t: Number, x: Number, y: Number, z: Number}],
                linAcce: [{t: Number, x: Number, y: Number, z: Number}],
                absOri: [{t: Number, x: Number, y:Number, z: Number, w:Number}],
                relOri: [{t: Number, x: Number, y:Number, z:Number, w:Number}]
            }
        })
        this.SensorDataModel = new mongo.model('pub-sensor-data', this.SensorDataSchema);
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

    async insertSensorData(payload){
        this.SensorDataModel.updateOne({ readingID: payload.readingID },{
            readingID: payload.readingID,
            activity: payload.activity,
            userAgent: payload.userAgent,
            IPaddress: payload.IPaddress,
            elapsedTime: payload.elapsedTime,
            $addToSet:{
                'sensorData.acce': {$each: payload.acce},
                'sensorData.gyro': {$each: payload.gyro},
                'sensorData.magnet': {$each: payload.magnet},
                'sensorData.grav': {$each: payload.grav},
                'sensorData.linAcce': {$each: payload.linAcce},
                'sensorData.absOri': {$each: payload.absOri},
                'sensorData.relOri': {$each: payload.relOri}
            }
        },{ upsert: true }).then(console.log).catch(console.log);
        
    }

    async cancelSensorData(payload){
        this.SensorDataModel.deleteOne(payload).then(console.log).catch(console.log);
        
    }
}

module.exports = db;