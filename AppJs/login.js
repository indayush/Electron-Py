const { remote, ipcRenderer } = require('electron')
var path = require("path")
const {PythonShell} = require("python-shell");

document.getElementById('login-minimize').addEventListener('click', () => {
    remote.getCurrentWindow().minimize()
})

document.getElementById('login-close').addEventListener('click', () => {
    ipcRenderer.send('closeApp')
    //remote.getCurrentWindow().close()
})



document.getElementById('loginBtn').addEventListener('click', () => {

    ipcRenderer.send('login-into-app')
    console.log('App JS sent to IPC Renderer')
})


function get_userName() {

    console.log('Inside get_userName() Function')
    var userName = document.getElementById("login_username").value
    console.log('Print in JS File - ' + userName)

    let options = {
        mode: 'text',
        pythonPath: 'C:/Users/Ayush Adarsh/scoop/apps/python/current/python.exe',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: './py-files/',
        args: [userName]
    };

    // var test = new PythonShell('login.py',options);
    // test.on('message',function(message){
    //     console.log('Reply from Python recieved in js file as - ' + message)
    // });

    
    PythonShell.run('login.py', options,  function  (err, message)  {
     if  (err)  throw err;
     console.log('Reply from Python recieved in js file as - ' + message)
    });
}

