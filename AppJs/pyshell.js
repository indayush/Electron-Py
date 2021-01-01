let { PythonShell } = require('python-shell')
const config = require('config');

const PYTHON_EXE_PATH = config.get('PYTHON_EXE_PATH');
const PYTHON_SHELL_OPTIONS_Mode = config.get('PYTHON_SHELL_OPTIONS_Mode');
const PYTHON_SHELL_OPTIONS_Options = config.get('PYTHON_SHELL_OPTIONS_Options');
const PYTHON_SHELL_OPTIONS_PythonFilesPath = config.get('PYTHON_SHELL_OPTIONS_PythonFilesPath');


let options = {
    mode: PYTHON_SHELL_OPTIONS_Mode, 
    pythonPath: PYTHON_EXE_PATH,
    pythonOptions: [PYTHON_SHELL_OPTIONS_Options], // gets print results in real-time
    scriptPath: PYTHON_SHELL_OPTIONS_PythonFilesPath,
    args: [userName]
};

    var test = new PythonShell('test.py',options);
    test.on('message',function(message){
        console.log('Reply from Python recieved in js file as - ' + message)
    });

// PythonShell.run('test.py', options, function (err, message) {
//      if (err) throw err;
//      console.log('Reply from Python recieved in js file as - ' + message)
//  });
