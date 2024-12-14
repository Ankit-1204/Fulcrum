from flask import Flask, request,jsonify
import joblib
import numpy as np

app =Flask(__name__)

@app.route('/predict',methods=['POST'])
def predict():
    data=request.json
    model_name=data['model_name']
    input=data['input']
    try:
        model_path=f'upload/{model_name}'
        model=joblib.load(model_path)
        prediction=model.predict(model)

        return jsonify({'prediction':prediction})
    except Exception as e:
        return jsonify({'error':str(e)}),500

if __name__=='__main__':
    app.run(host="0.0.0.0",port=5000)
