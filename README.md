# Security Risks of Mobile Device Sensors

This is the README.md describing the content of the additional attachments.
Author: Kateřina Henclová
### Content of this SD card

SD
- README.md................................................Readme file with SD card content description
- [doc/](#doc/)................................................................Thesis document files
	- thesis.pdf/ .........................................PDF of this thesis
	- latex/.....................................................LATEXsource code of this thesis
- [attack-page-src/])(#Attack-page-src/) ...................................... Source code of attack page
	- ap-frontend/ ................................... Frontend files of attack page
	- ap-backend/......................................Backend files of attack page
- [sensor-collection-page-src/](#Sensor-collection-page-src/)..................Source code of attack page
	- scp-frontend/....................................Frontend files of sensor collection page
	- scp-backend/ .................................. Backend files of sensor collection page
- [jupyter-notebooks/](#Jupyter-notebooks/) ................................. Python script notebooks
- [database/](#Database/).......................................................Sensor readings files

---

### Doc/

Contains the thesis.pdf and the Latex source codes in the `latex/` directory.

---
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

---
### Jupyter-notebooks/

##### Dependencies
The Jupyter Notebook in this project utilizes the following dependencies:

- ````markdown

- **h5py**: For interacting with HDF5 files.
- **copy**: For making copies of objects.
- **warnings**: For issuing warnings.
- **matplotlib**: For data visualization.
- **numpy**: For numerical computing.
- **pyarrow**: For interacting with Parquet files.
- **pandas**: For data manipulation and analysis.
- **seaborn**: For statistical data visualization.
- **lightgbm**: For gradient boosting framework.

Additionally, it uses various modules from `pandas`, `scipy`, `sklearn`, `joblib`, and `collections` libraries.

If you're using a virtual environment, you can install these dependencies using the following command:

```bash
pip install h5py matplotlib numpy pyarrow pandas seaborn lightgbm scikit-learn joblib
```

##### Running the notebook
To start Jupyter-notebook and execute, run:
```
jupyter-notebook
```

Open `Features_and_classification.ipynb` to view and execute scripts

##### Subdirectory description
- data/ contains sensor data being used for feature extraction and classifier training
- export/ contains exported byproducts of the data preprocessing and feature extraction
	- features.parquet - containing features
	- acce_data.h5 - contains accelerometer data 5-second intervals
	- gyro_data.h5 - contains gyroscope data 5-second intervals
	- acce_data.h5 - contains magnetometer data 5-second intervals
- images/ contains a few images the notebook generated

---
### Database/

Contains two files with mobile sensor readings collected for this thesis:

1.  mobile-sensor-reading_acce_gyro_magnet.json
	- contains 1283 readings of accelerometer, gyroscope and magnetometer which were used for classifier training
	
2. mobile-sensor-reading_acce_gyro_magnet_grav_linAcce_relOri_absOri.json
	- contains 1283 readings, same as file 1., but include additional sensors (gravity, linear acceleration, relative orientation and absolute orientation)


