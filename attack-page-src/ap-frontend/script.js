
let accelerometer;
let gyroscope;
let magnetometer;
let gravity;
let linearAcceleration;
let absoluteOrientation;
let relativeOrientation;

let startTime;
let startMoment;
let running = false;
let sensorContainer = document.getElementById('sensor-container');
let timeContainer = document.getElementById('time-container');
let accelerometerContainer = document.getElementById('accelerometer-container');
let gyroscopeContainer = document.getElementById('gyroscope-container');
let magnetometerContainer = document.getElementById('magnetometer-container');
let gravityContainer = document.getElementById('gravity-container');
let linearAccelerationContainer = document.getElementById('linearAcceleration-container');
let absoluteOrientationContainer = document.getElementById('absoluteOrientation-container');
let relativeOrientationContainer = document.getElementById('relativeOrientation-container');
let innerHTMLString = '';
let activityArray = [];


let magnetometerData = []
let accelerometerData = []
let gyroscopeData = []
let gravityData = []
let linearAccelerationData = []
let absoluteOrientationData = []
let relativeOrientationData = []

let sendDataInterval
let timerInterval


//-----------------------------------------------------------------------------------------
//  Containers containing the message to display to HTML, checking if sensors are available
//-----------------------------------------------------------------------------------------
const timer = () => {
  timerInterval = setInterval(()=>{
    timeContainer.innerHTML = `Time elapsed: ${(((new Date().getTime())-startTime)/1000).toFixed(0)} seconds\n\n\n`},
    1000)}

const accelerometerReadingHandler = () => {
  accelerometerContainer.innerHTML= `Accelerometer X: ${accelerometer.x.toFixed(2)}, Y: ${accelerometer.y.toFixed(2)}, Z: ${accelerometer.z.toFixed(2)}\n\n`;
  accelerometerData.push({t:new Date().getTime()-startTime, x:gyroscope.x?.toFixed(2), y:gyroscope.y?.toFixed(2), z:gyroscope.z?.toFixed(2)});
};

const gyroscopeReadingHandler = () => {
  gyroscopeContainer.innerHTML = `Gyroscope X: ${gyroscope.x.toFixed(2)}, Y: ${gyroscope.y.toFixed(2)}, Z: ${gyroscope.z.toFixed(2)}\n\n`;
  gyroscopeData.push({t:new Date().getTime()-startTime, x:gyroscope.x?.toFixed(2), y:gyroscope.y?.toFixed(2), z:gyroscope.z?.toFixed(2)});
};

const magnetometerReadingHandler = () => {
  magnetometerContainer.innerHTML = `Magnetometer X: ${magnetometer.x.toFixed(2)}, Y: ${magnetometer.y.toFixed(2)}, Z: ${magnetometer.z.toFixed(2)}\n\n`;
  magnetometerData.push({t:new Date().getTime()-startTime, x:magnetometer.x?.toFixed(2), y:magnetometer.y?.toFixed(2), z:magnetometer.z?.toFixed(2)});
};

const gravityReadingHandler = () => {
  gravityData.push({t:new Date().getTime()-startTime, x:gravity.x?.toFixed(2), y:gravity.y?.toFixed(2), z:gravity.z?.toFixed(2)});
};

const linearAccelerationReadingHandler = () => {
  linearAccelerationData.push({t:new Date().getTime()-startTime, x:linearAcceleration.x?.toFixed(2), y:linearAcceleration.y?.toFixed(2), z:linearAcceleration.z?.toFixed(2)});
};

const absoluteOrientationReadingHandler = () => {
  absoluteOrientationData.push({t:new Date().getTime()-startTime, x:absoluteOrientation.quaternion[0]?.toFixed(2), y:absoluteOrientation.quaternion[1]?.toFixed(2), z:absoluteOrientation.quaternion[2]?.toFixed(2), w:absoluteOrientation.quaternion[3]?.toFixed(2)});
};

const relativeOrientationReadingHandler = () => {
  relativeOrientationData.push({t:new Date().getTime()-startTime, x:relativeOrientation.quaternion[0]?.toFixed(2), y:relativeOrientation.quaternion[1]?.toFixed(2), z:relativeOrientation.quaternion[2]?.toFixed(2), w:relativeOrientation.quaternion[3]?.toFixed(2)});
};

if ('Sensor' in window) { 
  sensorContainer.innerHTML = `Sensors are supported - OK`;
} 
else {
  sensorContainer.innerHTML = `Browser settings don't support the Generic Sensor API - try a different browser or enable flags in about:flags for GenericSensorAPI`;
}

//------------------------------------------------------
//  Start button was clicked
//  - Start measuring time and sensor data
//  - Check if individual sensors are available
//  - Activate sensor reading handles
//  - Send data as JSON to backend via Fetch API
//------------------------------------------------------
document.querySelector('#start').addEventListener('click', () => {
  sensorContainer.innerHTML = `Guessing your activity...`;
  console.log("Start");
  startTime = new Date().getTime();
  startMoment = moment();
  console.log(startMoment.format('YYYY-MM-DD HH:mm:ss'));
  activityArray = [];

  timer();
  
  if ('Sensor' in window) { 
    running = true;

    if ('Accelerometer' in window) {
        accelerometer = new Accelerometer({frequency: 60});
        accelerometer.addEventListener('reading', accelerometerReadingHandler);
        accelerometer.start();
    } else {
      accelerometerContainer.innerHTML = `Accelerometer not supported`;
    }

    if ('Gyroscope' in window) {
      gyroscope = new Gyroscope({frequency: 60});
      gyroscope.addEventListener('reading', gyroscopeReadingHandler);
      gyroscope.start();
    } else {
      gyroscopeContainer.innerHTML = `Gyroscope not supported`;
    }

    if ('Magnetometer' in window) {
      magnetometer = new Magnetometer({frequency: 60});
      magnetometer.addEventListener('reading', magnetometerReadingHandler);
      magnetometer.start();
    } else {
      magnetometerContainer.innerHTML = `Magnetometer not supported - enable flag #enable-generic-sensor-extra-classes in about:flags`;
    }

    if ('GravitySensor' in window) {
      gravity = new GravitySensor({frequency: 60});
      gravity.addEventListener('reading', gravityReadingHandler);
      gravity.start();
    } else {
      gravityContainer.innerHTML = `GravitySensor not supported`;
    }

    if ('LinearAccelerationSensor' in window) {
      linearAcceleration = new LinearAccelerationSensor({frequency: 60});
      linearAcceleration.addEventListener('reading', linearAccelerationReadingHandler);
      linearAcceleration.start();
    } else {
      linearAccelerationContainer.innerHTML = `LinearAccelerationSensor not supported`;
    }

    if ('AbsoluteOrientationSensor' in window) {
      absoluteOrientation = new AbsoluteOrientationSensor({frequency: 60});
      absoluteOrientation.addEventListener('reading', absoluteOrientationReadingHandler);
      absoluteOrientation.start();
    } else {
      absoluteOrientationContainer.innerHTML = `AbsoluteOrientationSensor not supported`;
    }

    if ('RelativeOrientationSensor' in window) {
      relativeOrientation = new RelativeOrientationSensor({frequency: 60});
      relativeOrientation.addEventListener('reading', relativeOrientationReadingHandler);
      relativeOrientation.start();
    } else {
      relativeOrientationContainer.innerHTML = `RelativeOrientationSensor not supported`;
    }
  }

  sendDataInterval = setInterval( () =>{
    fetch('https://feta5.fit.vutbr.cz:9443/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        readingID: startTime,
        elapsedTime: moment().diff(startMoment, 'milliseconds'),
        acce: accelerometerData,
        gyro: gyroscopeData,
        magnet: magnetometerData
      })
    })
    .then(async data =>{
      magnetometerData = [];
      gyroscopeData = [];
      accelerometerData = [];
      let payload =await data.json();
      console.log('Response from backend:: ',payload.result);
      sensorContainer.innerHTML = `Predicted activity: ${payload.result}\n`;
      activityArray.push(payload.result);
      innerHTMLString = '';
      for (var i = 0; i < activityArray.length; i++) {
        innerHTMLString += activityArray[i] + '<br>';
      }
      sensorContainer.innerHTML = `Predicted activity:<br> ${innerHTMLString}\n`;
    }
    )
    .catch(error => console.error('Error:', error))
  },
    5000)
})
  
//------------------------------------------------------
//  Stop button was clicked
//  - Stop measuring time and sensor data
//  - Send remaining data to backend
//  - Clear variables and remove sensor handlers
//------------------------------------------------------
document.querySelector('#stop').addEventListener('click', async () => {
  console.log("Stop");
      magnetometerData = [];
      gyroscopeData = [];
      accelerometerData = [];

  clearInterval(sendDataInterval);
  clearInterval(timerInterval);

  accelerometer?.removeEventListener('reading', accelerometerReadingHandler);
  gyroscope?.removeEventListener('reading', gyroscopeReadingHandler);
  magnetometer?.removeEventListener('reading', magnetometerReadingHandler);
  gravity?.removeEventListener('reading', gravityReadingHandler);
  linearAcceleration?.removeEventListener('reading', linearAccelerationReadingHandler);
  absoluteOrientation?.removeEventListener('reading', absoluteOrientationReadingHandler);
  relativeOrientation?.removeEventListener('reading', relativeOrientationReadingHandler);


  startTime = null;
  if(running){
    activityArray.push('Stopped recording and guessing your activity :)');
    sensorContainer.innerHTML = `Predicted activity:<br> ${innerHTMLString}\n`;
    if (accelerometer) {
      accelerometer.stop();
      accelerometer = null;
    }
    if (gyroscope) {
      gyroscope.stop();
      gyroscope = null;
    }
    if (magnetometer) {
      magnetometer.stop();
      magnetometer = null;
    }
    if (gravity) {
      gravity.stop();
      gravity = null;
    }
    if (linearAcceleration) {
      linearAcceleration.stop();
      linearAcceleration = null;
    }
    if (absoluteOrientation) {
      absoluteOrientation.stop();
      absoluteOrientation = null;
    }
    if (relativeOrientation) {
      relativeOrientation.stop();
      relativeOrientation = null;
    }
  }
});

startTime = null;

//------------------------------------------------------
//  Collapsing and extending instruction container
//------------------------------------------------------
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var extension = this.nextElementSibling;
    if (extension.style.display === "none") {
      extension.style.display = "block";
    } else {
      extension.style.display = "none";
    }
  });
}






