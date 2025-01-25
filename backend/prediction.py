import requests
import numpy as np
from PIL import Image
import io

class Inference:
    def __init__(self):
        pass
    
    def predict(self,model_name, input, data_type):
        if(data_type=='text'):
            data=input
        elif(data_type=='image'):
            image_data = Image.open(input)  
            image_byte_array = io.BytesIO()
            image_data.save(image_byte_array, format='PNG')
            data = image_byte_array.getvalue()
        elif(data_type=='numpy_array'):
            data=input.tolist()
        
        data_json={
            'data':data,
            'model':model_name,
            'data_type':data_type
        }
        response = requests.post("http://localhost:3000/predict", json=data_json)
        return response

