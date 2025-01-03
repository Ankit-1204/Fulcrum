import requests
import getpass
class Fulkrum:
    def _init__(self):
        self.url='http://localhost:3000'
        self.token=None
        self.user=None
    
    def login(self):
        username = input("Enter your username: ")
        password = getpass.getpass("Enter your password: ")
        url='http://localhost:3000/auth/login'
        payload={'username':username,'password':password}
        token=requests.post(url,json=payload)
        data=token.json()
        self.token=data['token']
        self.user=data['user']
        return 
    
    def upload(self,model_path,model_type):
        with open(model_path,'rb') as model:
            file={'file':model}
            header={'Authorization' : self.token}
            payload={'model_type':'model_type','user':self.user}
            up_url=f'http://localhost:3000/upload'
            response=requests.post(up_url,headers=header,data=payload,files=file)
            return