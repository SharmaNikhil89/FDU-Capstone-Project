from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import textwrap
import os

app = Flask(__name__, static_folder='Frontend/medicoApp/dist/medicoApp')
CORS(app)

# Load the Excel file into a DataFrame
df = pd.read_excel('New_Sample.xlsx')

@app.route('/api/international-prescription', methods=['POST'])
def find_alternate_medicine():
    # Extract medicine name from the request
    medicine_name_input = request.json.get('medicineName')

    matching_medicines = df[df['Medicine Name'].str.contains(medicine_name_input, case=False)]

    results = []
    if not matching_medicines.empty:
        for index, row in matching_medicines.iterrows():
            result = {
                'medicine_name': row['Medicine Name'],
                'alternate_medicine': row['Alternate Medicines'],
                'uses': textwrap.fill(row['Uses'], width=80),
                'side_effects': textwrap.fill(row['Side Effects'], width=80),
                'how_to_use': textwrap.fill(row['How to use'], width=80)
            }
            results.append(result)
    return jsonify(results)

@app.route('/api/canadian-prescription', methods=['POST'])
def find_medicine():
    # Extract medicine name from the request
    medicine_name_input = request.json.get('medicineName')

    matching_medicines = df[df['Medicine Name'].str.contains(medicine_name_input, case=False)]

    results = []
    if not matching_medicines.empty:
        for index, row in matching_medicines.iterrows():
            result = {
                'medicine_name': row['Medicine Name'],
                'uses': textwrap.fill(row['Uses'], width=80),
                'side_effects': textwrap.fill(row['Side Effects'], width=80),
                'how_to_use': textwrap.fill(row['How to Use'], width=80),
                'how_it_works': textwrap.fill(row['How It Works'], width=80)
            }
            results.append(result)
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
