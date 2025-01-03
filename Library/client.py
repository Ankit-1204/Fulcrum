import requests
import getpass
class Fulkrum:
    def __init__(self):
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
    
    def signup(self):
        username = input("Enter your username: ")
        password = getpass.getpass("Enter your password: ")
        url='http://localhost:3000/auth/signup'
        payload={'username':username,'password':password}
        token=requests.post(url,json=payload)
        data=token.json()
        print(data['message'])
        return
    