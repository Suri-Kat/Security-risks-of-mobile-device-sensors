import joblib
import sys
import pandas as pd
import numpy as np
import json
from scipy.stats import kurtosis, skew

model_path = sys.argv[1]
payload = sys.argv[2]

if payload == {}:
    print("Payload is empty. Ending PythonShell.")
    sys.exit(1)


#   FUNCTIONS
#----------------------------------------------------------------------------------------------------------

# Function to calculate the absolute value
def calc_abs(dataFrame, x, y, z):
    return np.sqrt(dataFrame[x]**2 + dataFrame[y]**2 + dataFrame[z]**2)

# Function to calculate the data range
def calc_data_range(data):
    return np.nanmax(data) - np.nanmin(data)

# Function to calculate the IQR
def calc_data_iqr(data):
    q3, q1 = np.nanpercentile(data, [75 ,25])
    return q3 - q1

def remove_extra(data_frame):
    data_frame.drop('_id.$oid', axis=1, inplace=True)
    data_frame.drop('x.$numberDouble', axis=1, inplace=True)
    data_frame.drop('y.$numberDouble', axis=1, inplace=True)
    data_frame.drop('z.$numberDouble', axis=1, inplace=True)


#   FLATTENING DATA INTO DATAFRAME
#------------------------------------------------------------------------------------------------------------------------
df = pd.DataFrame()
df = pd.json_normalize(json.loads(payload))

acce_flat_data = pd.concat(df['acce'].apply(lambda x: pd.json_normalize(x)).to_list(), ignore_index=True)
gyro_flat_data = pd.concat(df['gyro'].apply(lambda x: pd.json_normalize(x)).to_list(), ignore_index=True)
magnet_flat_data = pd.concat(df['magnet'].apply(lambda x: pd.json_normalize(x)).to_list(), ignore_index=True)

# Renaming columns
acce_column_names = {'t': 'acce_t', 'x': 'acce_x', 'y': 'acce_y', 'z': 'acce_z', '_id.$oid': '_acce_obj_id'}
acce_flat_data.rename(columns=acce_column_names, inplace=True)
gyro_column_names = {'t': 'gyro_t', 'x': 'gyro_x', 'y': 'gyro_y', 'z': 'gyro_z', '_id.$oid': '_gyro_obj_id'}
gyro_flat_data.rename(columns=gyro_column_names, inplace=True)
magnet_column_names = {'t': 'magnet_t', 'x': 'magnet_x', 'y': 'magnet_y', 'z': 'magnet_z', '_id.$oid': '_magnet_obj_id'}
magnet_flat_data.rename(columns=magnet_column_names, inplace=True)


#   CALCULATING FEATURES
#------------------------------------------------------------------------------------------------------------------------

acce_flat_data = acce_flat_data.apply(pd.to_numeric)
gyro_flat_data = gyro_flat_data.apply(pd.to_numeric)
magnet_flat_data = magnet_flat_data.apply(pd.to_numeric)

acce_flat_data["acce_abs"] = calc_abs(acce_flat_data, 'acce_x', 'acce_y', 'acce_z')
gyro_flat_data["gyro_abs"] = calc_abs(gyro_flat_data, 'gyro_x', 'gyro_y', 'gyro_z')
magnet_flat_data["magnet_abs"] = calc_abs(magnet_flat_data, 'magnet_x', 'magnet_y', 'magnet_z') if not magnet_flat_data.empty else np.nan

# Fixes the error with correlation of empty magnetometer
if len(magnet_flat_data["magnet_abs"]) > 0:
    magnet_abs_corr = np.nanmean(np.correlate(magnet_flat_data["magnet_abs"], magnet_flat_data["magnet_abs"], mode='full'))
else:
    magnet_abs_corr = np.nan

data_features = {
    # MEAN ABSOLUTE VALUE
    "acce_abs_mean" : np.nanmean(acce_flat_data["acce_abs"]),
    "gyro_abs_mean" : np.nanmean(gyro_flat_data["gyro_abs"]),
    "magnet_abs_mean" : np.nanmean(magnet_flat_data["magnet_abs"])if not magnet_flat_data.empty else np.nan,
    # MEDIAN ABSOLUTE VALUE
    "acce_abs_median" : acce_flat_data["acce_abs"].median(),
    "gyro_abs_median" : gyro_flat_data["gyro_abs"].median(),
    "magnet_abs_median" : magnet_flat_data["magnet_abs"].median()if not magnet_flat_data.empty else np.nan,
    # MIN ABSOLUTE VALUE
    "acce_abs_min" : np.nanmin(acce_flat_data["acce_abs"]),
    "gyro_abs_min" : np.nanmin(gyro_flat_data["gyro_abs"]),
    "magnet_abs_min" : np.nanmin(magnet_flat_data["magnet_abs"]) if not magnet_flat_data.empty else np.nan,
    # MAX ABSOLUTE VALUE
    "acce_abs_max" : np.nanmax(acce_flat_data["acce_abs"]),
    "gyro_abs_max" : np.nanmax(gyro_flat_data["gyro_abs"]),
    "magnet_abs_max" : np.nanmax(magnet_flat_data["magnet_abs"]) if not magnet_flat_data.empty else np.nan,
    # DATA RANGE OF ABSOLUTE VALUE
    "acce_abs_data_range" : calc_data_range(acce_flat_data["acce_abs"]),
    "gyro_abs_data_range" : calc_data_range(gyro_flat_data["gyro_abs"]),
    "magnet_abs_data_range" : calc_data_range(magnet_flat_data["magnet_abs"]) if not magnet_flat_data.empty else np.nan,
    # IQR
    "acce_abs_iqr" : calc_data_iqr(acce_flat_data["acce_abs"]),
    "gyro_abs_iqr" : calc_data_iqr(gyro_flat_data["gyro_abs"]),
    "magnet_abs_iqr" : calc_data_iqr(magnet_flat_data["magnet_abs"]) if not magnet_flat_data.empty else np.nan,
    # STANDARD DEVIATION
    "acce_abs_sd" : np.std(acce_flat_data["acce_abs"]),
    "gyro_abs_sd" : np.std(gyro_flat_data["gyro_abs"]),
    "magnet_abs_sd" : np.std(magnet_flat_data["magnet_abs"]),
    # VARIANCE
    "acce_abs_var" : np.var(acce_flat_data["acce_abs"]),
    "gyro_abs_var" : np.var(gyro_flat_data["gyro_abs"]),
    "magnet_abs_var" : np.var(magnet_flat_data["magnet_abs"]),
    # KURTOSIS
    "acce_abs_kurt" : kurtosis(acce_flat_data["acce_abs"], nan_policy='omit'),
    "gyro_abs_kurt" : kurtosis(gyro_flat_data["gyro_abs"], nan_policy='omit'),
    "magnet_abs_kurt" : kurtosis(magnet_flat_data["magnet_abs"], nan_policy='omit'),
    # SKEWNESS
    "acce_abs_skew" : skew(acce_flat_data["acce_abs"]),
    "gyro_abs_skew" : skew(gyro_flat_data["gyro_abs"]),
    "magnet_abs_skew" : skew(magnet_flat_data["magnet_abs"]),
    # CORRELATION
    "acce_abs_corr" : np.nanmean(np.correlate(acce_flat_data["acce_abs"],acce_flat_data["acce_abs"], mode='full')),
    "gyro_abs_corr" : np.nanmean(np.correlate(gyro_flat_data["gyro_abs"], gyro_flat_data["gyro_abs"], mode='full')),
    "magnet_abs_corr" : magnet_abs_corr
}

df_features = pd.DataFrame(data_features, index=[0])


#   PREDICTING ACTIVITY AND RETURNING IT
#------------------------------------------------------------------------------------------------------------------------

#model_path = 'ai_model.pkl'
model = joblib.load(model_path)

#class_map = {'"Taking the tram"': 0, '"Walking"': 1, '"Sitting"': 2, '"Standing"': 3, '"Taking the stairs up"': 4, '"Lying"': 5, '"Taking the train"': 6, '"Taking the stairs down"': 7, '"Taking the bus"': 8, '"Riding in a car"': 9}
class_map = {'"Phone on table"': 0, '"Lying"': 1, '"Sitting"': 2, '"Standing"': 3, '"Walking"': 4, '"Taking the car"': 5, '"Taking the bus"': 6, '"Taking the tram"': 7, '"Taking the train"': 8} #,'"Taking the metro"': 9}

prediction = model.predict(df_features)
predicted_activity = next((class_name.strip('"') for class_name, label in class_map.items() if label == prediction), "Unknown")

print(predicted_activity)

sys.stdout.flush()
