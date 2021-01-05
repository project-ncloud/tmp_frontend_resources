function include(file){//Kanged from geeks for geeks
    var script=document.createElement("script");
    script.src=file;
    script.type='text/javascript';
    script.defer=true;
    document.getElementsByTagName('head').item(0).appendChild(script);
}

include('./requests.js')


let power = true
let sortDirection = true
let showNConsolePanel = false
console.log('Hello world')


const users=[
    {
        name : "Sourav Gain",
        userName : "epicX67",
        type : "Student",
        enabled : true
    },
    {
        name : "Indrajit Sarkar",
        userName : "indskr69",
        type : "Faculty",
        enabled : false
    },
    {
        name : "Bishal Mondal",
        userName : "bishal77",
        type : "Faculty",
        enabled : true
    },
    {
        name : "Sujoy Saha",
        userName : "sujoysaha",
        type : "Student",
        enabled : true
    },
    {
        name : "Petrol Sopon",
        userName : "enimel",
        type : "Student",
        enabled : true
    },
]

const pendingUser = users.copyWithin()

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

function nConsole(msg, status = null, success = null){
    let x = document.getElementById('debugContainer')
    let y = ''
    if(status != null){
        y = `<div>${msg} <span class="${success!=null ? success == true ? 'cyanBg' : 'redBg' : 'yellowBg'}">${status}</span></div>`
    }else{
        y = `<div>${msg}</div>`
    }
    x.innerHTML+=y
}

function nConsolePanel(){
    let x = showNConsolePanel
    if(x){
        document.getElementById('nConsolePanel').classList.add('Nright')
    }else{
        document.getElementById('nConsolePanel').classList.remove('Nright')
    }
    showNConsolePanel = !showNConsolePanel

    fetchServerData()
}

function clearNConsole(){
    document.getElementById('debugContainer').innerHTML=''
    nConsole('Log will be genarated here..')
}

async function closeOverlay(id){
    document.getElementById(id).style.opacity=0
    await sleep(200)
    document.getElementById(id).style.display='none'
}

async function openOverlay(id){
    document.getElementById(id).style.display='grid'
    await sleep(10)
    document.getElementById(id).style.opacity=1
}



async function hideElement(id){
    document.getElementById(id).style.opacity=0
    document.getElementById(id).style.display='none'
    await sleep(200)
}

async function showElement(id, display = 'flex'){
    document.getElementById(id).style.display=display
    await sleep(10)
    document.getElementById(id).style.opacity=1
}

async function showLoadingAnima(id){
    showElement(id, 'grid')
}
async function hideLoadingAnima(id){
    hideElement(id)
}



async function togglePowerBtn(id){
    hideElement(power ? 'powerON' : 'powerOFF')
    await sleep(10)
    showElement(power ? 'powerOFF' : 'powerON', 'block')
    power = !power
    closeOverlay(id)
}


async function setNOverlay(id, functionName){

}


function getRowHtml(obj){
    return `
<div class="row">
    <div class="col"><i class=${obj.type.toUpperCase() == 'STUDENT' ? "ri-user-2-fill" : "ri-user-6-fill" }></i>${obj.name}</div>
    <div class="col">${obj.type}</div>
    <div class="col">${obj.enabled ? 'Enabled' : 'Disabled'}</div>
    <div class="col colAction">
        <i class="ri-close-circle-fill"></i>
        <input type="checkbox" id="${obj.userName}" class="checkbox" ${obj.enabled ? 'checked' : ''} /> 
        <label for="${obj.userName}" class="toggle"> 
            <i class="ri-shut-down-line btnON"></i>
        </label> 
    </div>
</div>
    `
}


function getPendingRowHtml(obj){
    return `
<div class="row pendingUserRow">
    <div class="col"><i class=${obj.type.toUpperCase() == 'STUDENT' ? "ri-user-2-fill" : "ri-user-6-fill" }></i>${obj.name}</div>
    <div class="col">${obj.type}</div>
    <div class="col colAction">
        <i class="ri-close-line"></i>
        <i class="ri-checkbox-circle-fill"></i>
    </div>
</div>
    `
}

async function renderList(id, sort = false){
    if(!sort) showLoadingAnima('userListLoading')
    buffer = ""
    users.forEach(user => {
        buffer += getRowHtml(user)
    });
    document.getElementById(id).innerHTML = buffer
    await sleep(2000)
    if(!sort) hideLoadingAnima('userListLoading')
}

async function renderPendingList(id, sort = false){
    if(!sort) showLoadingAnima('userPendingListLoading')
    buffer = ""
    pendingUser.forEach(user => {
        buffer += getPendingRowHtml(user)
    });
    document.getElementById(id).innerHTML = buffer
    await sleep(2000)
    if(!sort) hideLoadingAnima('userPendingListLoading')
}

function sortList(){
    if(sortDirection){
        users.sort((a, b) => a.name.localeCompare(b.name)) //Kanged from stackOverfolo
    }else{
        users.sort((a, b) => b.name.localeCompare(a.name))
    }
    sortDirection = !sortDirection
    renderList('userList', true)
}

function sortPendingList(){
    if(sortDirection){
        pendingUser.sort((a, b) => a.name.localeCompare(b.name)) //Kanged from stackOverfolo
    }else{
        pendingUser.sort((a, b) => b.name.localeCompare(a.name))
    }
    sortDirection = !sortDirection
    renderPendingList('userPendingList', true)
}

function filterList(val){
    if(val.trim() === ''){
        renderList('userList')
        return
    }
    var buffer = ''
    users.forEach(user => {
        if(user.name.toUpperCase().indexOf(val.toUpperCase()) != -1){
            buffer += getRowHtml(user)
        }
    });
    document.getElementById('userList').innerHTML = buffer
}

function filterPendingList(val){
    if(val.trim() === ''){
        renderList('userPendingList')
        return
    }
    var buffer = ''
    pendingUser.forEach(user => {
        if(user.name.toUpperCase().indexOf(val.toUpperCase()) != -1){
            buffer += getPendingRowHtml(user)
        }
    });
    document.getElementById('userPendingList').innerHTML = buffer
}

function search(id){
    filterList(document.getElementById(id).value)
}

function searchPending(id){
    filterPendingList(document.getElementById(id).value)
}

function openUserList(id){
    renderList('userList')
    openOverlay(id)
}

function openUserPendingList(id){
    renderPendingList('userPendingList')
    openOverlay(id)
}


function clearPanel_addServer(){
    document.getElementById('addServerName').value = ''
    document.getElementById('addServerAddress').value = ''
    document.getElementById('addAutoStart').checked = false
    document.getElementById('addServerStatus').innerHTML = ''
}
function addServer(id){
    const name = document.getElementById('addServerName').value.trim()
    let addr = document.getElementById('addServerAddress').value.trim()
    const autoStart = document.getElementById('addAutoStart').checked
    let status = document.getElementById('addServerStatus')
    if(addr[addr.length - 1] == '/'){
        addr = addr.substr(0, addr.length - 1)
    }

    fetch(addr + '/api/init').then((res)=>{
        if(res.status == 200){
            status.innerHTML = `<p class="cyan">Successful</p>`
            nConsole(`${addr} added`, 'Successful', true)
            clearPanel_addServer()
            closeOverlay(id)
        }else{
            status.innerHTML = `<p class="red">Server Doesn't exists</p>`
            nConsole("Server Doesn't exists", 'Failed', false)
        }
    }).catch(err =>{
        status.innerHTML = `<p class="red">Server Doesn't exists</p>`
        nConsole("Server Doesn't exists", 'Failed', false)
    })

}

