let { PythonShell } = require('python-shell')


let options = {
    mode: 'text',
    pythonPath: 'C:/Users/Ayush Adarsh/scoop/apps/python/current/python.exe',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: './',
    args: ['userName']
};

    var test = new PythonShell('test.py',options);
    test.on('message',function(message){
        console.log('Reply from Python recieved in js file as - ' + message)
    });

// PythonShell.run('test.py', options, function (err, message) {
//     if (err) throw err;
//     console.log('Reply from Python recieved in js file as - ' + message)
// });