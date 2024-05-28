// @license magnet:?xt=urn:btih:d3d9a9a6595521f9666a5e94cc830dab83b65699&dn=expat.txt Expat

// This code is licensed under the MIT License.
// Author: Surikat
// Year: 2024

// This script uses moment.js for date/time manipulation.


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
let IPaddressContainer = document.getElementById('IPaddress-container');
let userAgentContainer = document.getElementById('userAgent-container');
let timeContainer = document.getElementById('time-container');
let accelerometerContainer = document.getElementById('accelerometer-container');
let gyroscopeContainer = document.getElementById('gyroscope-container');
let magnetometerContainer = document.getElementById('magnetometer-container');

let gravityContainer = document.getElementById('gravity-container');
let linearAccelerationContainer = document.getElementById('linearAcceleration-container');
let absoluteOrientationContainer = document.getElementById('absoluteOrientation-container');
let relativeOrientationContainer = document.getElementById('relativeOrientation-container');


let magnetometerData = []
let accelerometerData = []
let gyroscopeData = []

let gravityData = []
let linearAccelerationData = []
let absoluteOrientationData = []
let relativeOrientationData = []

let sendDataInterval
let timerInterval
let activity = null;
let userAgent = null;
let IPaddress = null;


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
  gravityContainer.innerHTML = `Gravity X: ${gravity.x.toFixed(2)}, Y: ${gravity.y.toFixed(2)}, Z: ${gravity.z.toFixed(2)}\n\n`;
  gravityData.push({t:new Date().getTime()-startTime, x:gravity.x?.toFixed(2), y:gravity.y?.toFixed(2), z:gravity.z?.toFixed(2)});
};

const linearAccelerationReadingHandler = () => {
  linearAccelerationContainer.innerHTML = `LinearAcceleration X: ${linearAcceleration.x.toFixed(2)}, Y: ${linearAcceleration.y.toFixed(2)}, Z: ${linearAcceleration.z.toFixed(2)}\n\n`;
  linearAccelerationData.push({t:new Date().getTime()-startTime, x:linearAcceleration.x?.toFixed(2), y:linearAcceleration.y?.toFixed(2), z:linearAcceleration.z?.toFixed(2)});
};

const absoluteOrientationReadingHandler = () => {
  absoluteOrientationContainer.innerHTML = `AbsoluteOrientation X: ${absoluteOrientation.quaternion[0]?.toFixed(2)}, Y: ${absoluteOrientation.quaternion[1]?.toFixed(2)}, Z: ${absoluteOrientation.quaternion[2]?.toFixed(2)}, W: ${absoluteOrientation.quaternion[3]?.toFixed(2)}\n\n`;
  absoluteOrientationData.push({t:new Date().getTime()-startTime, x:absoluteOrientation.quaternion[0]?.toFixed(2), y:absoluteOrientation.quaternion[1]?.toFixed(2), z:absoluteOrientation.quaternion[2]?.toFixed(2), w:absoluteOrientation.quaternion[3]?.toFixed(2)});
};

const relativeOrientationReadingHandler = () => {
  relativeOrientationContainer.innerHTML = `RelativeOrientation X: ${relativeOrientation.quaternion[0]?.toFixed(2)}, Y: ${relativeOrientation.quaternion[1]?.toFixed(2)}, Z: ${relativeOrientation.quaternion[2]?.toFixed(2)}, W: ${relativeOrientation.quaternion[3]?.toFixed(2)}}\n\n`;
  relativeOrientationData.push({t:new Date().getTime()-startTime, x:relativeOrientation.quaternion[0]?.toFixed(2), y:relativeOrientation.quaternion[1]?.toFixed(2), z:relativeOrientation.quaternion[2]?.toFixed(2), w:relativeOrientation.quaternion[3]?.toFixed(2)});
};

if ('Sensor' in window) { 
  sensorContainer.innerHTML = `Sensors are supported - OK`;
} 
else {
  sensorContainer.innerHTML = `Browser settings don't support the Generic Sensor API - try a different browser or enable flags in about:flags for GenericSensorAPI`;
}

document.querySelector('#start').addEventListener('click', () => {
  activity = JSON.stringify(document.getElementById('activity').value);
  console.log("Start");
  startTime = new Date().getTime();
  startMoment = moment();
  console.log(startMoment.format('YYYY-MM-DD HH:mm:ss'));

  userAgent = navigator.userAgent;

  // IP address lookup powered by ipify (https://www.ipify.org/)
  fetch('https://api.ipify.org')
  .then(response => response.text())
  .then(data => {
      IPaddress = data;
      IPaddressContainer.innerHTML = `IP address: ${IPaddress}\n`;
  })
  .catch(error => {});

  timer();
  
  if ('Sensor' in window) { 
    running = true;
    sensorContainer.innerHTML = `Recording activity: ${activity}\n`;
    userAgentContainer.innerHTML = `UserAgent: ${userAgent}\n`;

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
    fetch('https://feta5.fit.vutbr.cz:8444/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        readingID: startTime,
        activity: activity,
        userAgent: userAgent,
        IPaddress: IPaddress,
        elapsedTime: moment().diff(startMoment, 'milliseconds'),
        gyro: gyroscopeData,
        magnet: magnetometerData,
        acce: accelerometerData,
        grav: gravityData,
        linAcce: linearAccelerationData,
        absOri: absoluteOrientationData,
        relOri: relativeOrientationData 
      })
    })
    .then(data =>{
      magnetometerData = [];
      gyroscopeData = [];
      accelerometerData = [];
      gravityData = [];
      linearAccelerationData = [];
      absoluteOrientationData = [];
      relativeOrientationData = [];
    }
    )
    .catch(error => console.error('Error:', error))
  },
    2000)
  })
  
document.querySelector('#stop').addEventListener('click', async () => {
  console.log("Stop");
 const result = await fetch('https://feta5.fit.vutbr.cz:8444/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        readingID: startTime,
        activity: activity,
        userAgent: userAgent,
        IPaddress: IPaddress,
        elapsedTime: moment().diff(startMoment, 'milliseconds'),
        gyro: gyroscopeData,
        magnet: magnetometerData,
        acce: accelerometerData,
        grav: gravityData,
        linAcce: linearAccelerationData,
        absOri: absoluteOrientationData,
        relOri: relativeOrientationData  
      })
    })
      magnetometerData = [];
      gyroscopeData = [];
      accelerometerData = [];
      gravityData = [];
      linearAccelerationData = [];
      absoluteOrientationData = [];
      relativeOrientationData = [];

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
    sensorContainer.innerHTML = `Stopped recording - data saved`;
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

document.querySelector('#cancel').addEventListener('click', () => {
  console.log("Cancel");

  clearInterval(sendDataInterval);
  clearInterval(timerInterval);

  accelerometer?.removeEventListener('reading', accelerometerReadingHandler);
  gyroscope?.removeEventListener('reading', gyroscopeReadingHandler);
  magnetometer?.removeEventListener('reading', magnetometerReadingHandler);
  gravity?.removeEventListener('reading', gravityReadingHandler);
  linearAcceleration?.removeEventListener('reading', linearAccelerationReadingHandler);
  absoluteOrientation?.removeEventListener('reading', absoluteOrientationReadingHandler);
  relativeOrientation?.removeEventListener('reading', relativeOrientationReadingHandler);

  
  if(running){
    sensorContainer.innerHTML = `Canceled recording - data not saved`;
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
  fetch(`https://feta5.fit.vutbr.cz:8444/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      readingID: startTime,
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log('Data deleted successfully.');
    })
    .catch(error => console.error('Error:', error));

});
startTime = null;
// For extension panel
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

// @license-end



