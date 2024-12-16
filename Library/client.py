import requests
from flask import Flask, request, jsonify

class Fulkrum:
    def _init__(self):
        self.url='http://localhost:3000'
        self.token=None
    
    def upload(self,model_path,model_type):
        with open(model_path,'rb') as model:
            payload={'token':self.token,'file':model,'model_type':model_type}
            up_url=f'{self.url}/upload'
            response=requests(up_url,json=payload)
            print(response)
            return