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

//Function that creates the main container of the page and all of the elements on the page.
const createContainer = () =>{
    const container = create('div', 'container')
    const fLeftButton = create('button', 'goLeftButton')
    fLeftButton.disabled = true
    const fRightButton = create('button', 'goRightButton')
    const sLeftButton = create('button', 'goLeftButton')
    const sRightButton = create('button', 'goRightButton')
    const tLeftButton = create('button', 'goLeftButton')
    const tRightButton = create('button', 'goRightButton')
    tRightButton.disabled = true
    
    fRightButton.innerText = ">"
    fLeftButton.innerText = "<"
    sRightButton.innerText = ">"
    sLeftButton.innerText = "<"
    tRightButton.innerText = ">"
    tLeftButton.innerText = "<"

    const first = create('div','firstBox')
    const firstText = create('p')
    firstText.innerText = 'FIRST'
    first.append(fLeftButton, fRightButton, firstText)

    const second = create('div','secondBox')
    const secondText = create('p')
    secondText.innerHTML = 'SECOND'
    second.append(sLeftButton, sRightButton, secondText)

    const third = create('div','thirdBox')
    const thirdText = create('p')
    thirdText.innerHTML = 'THIRD'
    third.append(tLeftButton, tRightButton, thirdText)
    
    container.append(first, second, third)

    //Function that creates a div for useres and places the users in the different boxes based on their slots.
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

        //Event listner that toggles the selected property when the name is selected.
        user.addEventListener('click', (ev) => {
            const stateUser = state.customers[ev.target.id -1]
            stateUser.selected = !stateUser.selected     
            render()
        })  
    }            

    //Button event listners that move the users between the different boxes.
    tLeftButton.addEventListener('click', (ev) => {
        const thisUser = third.getElementsByClassName('selected users')
        let arr = [...thisUser]
        arr.forEach(element => {
            const stateUser = state.customers[element.id -1]
            stateUser.slot = 'second' 
        })
        render ()
    })
        
    sLeftButton.addEventListener('click', (ev) => {
        const thisUser = second.getElementsByClassName('selected users')
        let arr = [...thisUser]
        arr.forEach(element => {
            const stateUser = state.customers[element.id -1]
            stateUser.slot = 'first' 
        })
        render ()
    })    
    
    sRightButton.addEventListener('click', (ev) => {
        const thisUser = second.getElementsByClassName('selected users')
        let arr = [...thisUser]
        arr.forEach(element => {
            const stateUser = state.customers[element.id -1]
            stateUser.slot = 'third' 
        })
        render ()
    })   
                
    fRightButton.addEventListener('click', (ev) => {
        const thisUser = first.getElementsByClassName('selected users')
        let arr = [...thisUser]
        arr.forEach(element => {
            const stateUser = state.customers[element.id -1]
            stateUser.slot = 'second' 
        })
        render ()
    })    
            
    //Map function that creates the new user to update the state.
    state.customers.map(user => createUser(user))
    return container
}

//Render Function
const render = () => {
    app.innerHTML = ''
    const title = create('h1')
    title.innerText = "Acme First, Second, Third"
    app.append(title, createContainer())
}
render()