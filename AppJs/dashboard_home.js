const { remote, ipcRenderer } = require('electron')

document.getElementById('dash-minimize').addEventListener('click', () => {
    remote.getCurrentWindow().minimize()
})

document.getElementById('dash-close').addEventListener('click', () => {
    //remote.getCurrentWindow().close()
    ipcRenderer.send('closeApp')
})

document.getElementById('dash-signOut').addEventListener('click', () => {
    ipcRenderer.send('logoutFromApp')
    //remote.getCurrentWindow().close()
})

