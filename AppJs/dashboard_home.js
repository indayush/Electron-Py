const { remote } = require('electron')

document.getElementById('login-minimize').addEventListener('click', () => {
    remote.getCurrentWindow().minimize()
})

document.getElementById('login-close').addEventListener('click', () => {
    remote.getCurrentWindow().close()
})

document.getElementById('dash-signOut').addEventListener('click', () => {
    remote.getCurrentWindow().minimize()
})

document.getElementById().addEventListener('click', () => {

})