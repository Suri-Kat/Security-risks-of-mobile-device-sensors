# Security Risks of Mobile Device Sensors

Public source codes:
- Attack-page-src
      - Page to demonstrate activity recognition based on sensor data
- Sensor-collection-page-src
      - Page to collect mobile sensor data
- Jupyter-notebooks
      - Contains scripts to test and train an activity classificator

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
- export/ contains exported byproducts of the data preprocessing and feature extraction
	- features.parquet - containing features
- images/ contains a few images the notebook generated
