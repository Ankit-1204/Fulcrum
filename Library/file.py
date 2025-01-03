import requests

class File:
    def __init__(self,token,user):
        self.url='http://localhost:3000'
        self.token=token
        self.user=user
    
    def upload(self,model_path,model_type):
        with open(model_path,'rb') as model:
            file={'file':model}
            header={'Authorization' : self.token}
            payload={'model_type':model_type,'user':self.user}
            up_url=f'http://localhost:3000/upload'
            response=requests.post(up_url,headers=header,data=payload,files=file)
            print(response['message'])
            return