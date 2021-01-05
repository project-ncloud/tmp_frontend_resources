let servers = [

]


async function fetchServerData(){
    servers = null
    nConsole("Starts fetching server data...", 'Wait for a second')
    try {
        res = await fetch('http://127.0.0.1:5000/api/servers', {
            method: 'GET'
        })
        data = await res.json()
        nConsole(`${data.length} Servers found`)
        nConsole(`Done`, 'Successful', true)
    } catch (error) {
        nConsole(error, 'Failed', false)
    }
    finally{
        return data
    }
}