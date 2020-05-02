const app = document.querySelector('#app')

const state = { 
    customers : [
    { id: 1, name: 'moe', slot: 'third'},
    { id: 2, name: 'larry', slot: 'second'},
    { id: 3, name: 'shep', slot: 'third', selected: true},
    { id: 4, name: 'lucy', slot: 'first', selected: true},
    ]
}

const create = (type,className) => {
        const element = document.createElement(type)
        if(className){
            element.classList.add(className)
        }
        return element
}
    
const createContainer = () =>{
    const container = create('div', 'container')
    const fLeftButton = create('button', 'goLeftButton')
    const fRightButton = create('button', 'goRightButton')
    const sLeftButton = create('button', 'goLeftButton')
    const sRightButton = create('button', 'goRightButton')
    const tLeftButton = create('button', 'goLeftButton')
    const tRightButton = create('button', 'goRightButton')
    
    fRightButton.innerText = ">"
    fLeftButton.innerText = "<"
    sRightButton.innerText = ">"
    sLeftButton.innerText = "<"
    tRightButton.innerText = ">"
    tLeftButton.innerText = "<"

    const first = create('div','firstBox')
    first.innerHTML = 'FIRST'
    first.append(fLeftButton, fRightButton)
    
    const second = create('div','secondBox')
    second.innerHTML = 'SECOND'
    second.append(sLeftButton, sRightButton)

    const third = create('div','thirdBox')
    third.innerHTML = 'THIRD'
    third.append(tLeftButton, tRightButton)
    
    container.append(first, second, third)

    

   

    const createUser = ({id, name, slot, selected}) => {
        const user = create('div', selected  ? 'selected':'notSelected')
        user.setAttribute('id', id)
        user.classList.add('users')
        user.innerHTML = name
        if (slot === 'first'){
            first.append(user)
        }
        if(slot === 'second'){
            second.append(user)
        }
        if (slot === 'third'){
            third.append(user)
        }
        user.addEventListener('click', (ev) => {
            const stateUser = state.customers[ev.target.id -1]
            //console.log(typeof ev.target.id)
            //console.log(typeof state.customers[ev.target.id -1].id)
            //if (ev.target.id === strUserId){
                stateUser.selected = !stateUser.selected     
        


            render()})  
        }            

    
        tLeftButton.addEventListener('click', (ev) => {
            const thisUser = third.getElementsByClassName('users')
            
            const test = [...thisUser][0]
            console.log(test)
        })    
        
    
    
    
    

    state.customers.map(user => createUser(user))
    //console.log(state.customers)
    return container
}



const render = () => {
    app.innerHTML = ''
    const title = create('h1')
    title.innerText = "Acme First, Second, Third"
    app.append(title, createContainer())
}
render()