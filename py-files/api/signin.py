import sys
import os
sys.path.append(os.getcwd()+"/api")
import dblogin



def comLogin(username,password,remember):
    db = dblogin.cluster['admin']
    collection = db['dblogin']

    try:
        if remember == "rem":
            pass
        else:
            fetch  = collection.find_one({"username":username, "password":password})
            if fetch['userame'] == username and fetch["password"] == password:
                return "Login Success"
    except:
        db.close()
        return "Login Failed"

