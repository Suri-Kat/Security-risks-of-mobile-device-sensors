### Attack-page-src/

The attack on mobile sensors, performing activity recognition. 
This page is running in production on https://feta5.fit.vutbr.cz/attack/

##### Prerequisites
This project requires Node.js and Python 3 to run.
Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (>=10.x)
- [Python 3](https://www.python.org/downloads/) (>=3.6)
- [pip](https://pip.pypa.io/en/stable/installing/) (Python package manager)

##### Additional Dependencies
To install dependencies required for the attack page, run the following commands:

```
npm install express mongoose cors python-shell 
```
```
pip install joblib pandas numpy scipy scikit-learn
```

##### Running backend server
To start backend server, run:
```
node server.js
```

---
### Sensor-collection-page-src/

This page is running in production on https://feta5.fit.vutbr.cz/sensor-page/

##### Prerequisites
This project requires Node.js and Python 3 to run.
Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (>=10.x)
##### Additional Dependencies
To install dependencies required for the attack page, run the following commands:

```
npm install express mongoose cors python-shell 
```
##### Running backend server
To start backend server, run:
```
node server.js
```
