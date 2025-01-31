const searchForm = document.querySelector('#search-form')
const diaryEntry = document.querySelector('#diaryEntry')
const diaryEdit = document.querySelector('#default #edit')
const diaryDelete = document.querySelector('#default #delete')
const diaryOutputs = document.querySelector('#diaryOutputs')
const diaryDefault = document.querySelector('#default')
const diaryCards = document.querySelector('.card')

searchForm.addEventListener('submit',search)

function search(e){
    e.preventDefault()
    let searchQuery = e.target[0].value 
    if (searchQuery=="diary"){
        getAll()
    }
    e.target[0].value = ""
}

diaryEntry.addEventListener('submit',entry)

function entry(e){
    e.preventDefault()
    const formData = new FormData(diaryEntry);
    const formObject = Object.fromEntries(formData.entries()); // Convert FormData to an object
    console.log(formObject)

    if (formObject){
        const newCard = document.createElement('div')
        newCard.className = 'card mt-1'
        const cardBody = document.createElement('div')
        cardBody.className = 'card-body'
        const h5 = document.createElement('h5')
        h5.className = 'card-title'
        h5.innerText = formObject.title
        const date = document.createElement('p')
        date.innerText = formObject.date
        const text = document.createElement('p')
        text.className = 'card-text'
        text.innerText = formObject.entry
        const buttons = document.createElement('div')
        buttons.className = 'd-flex justify-content-start gap-1'
        const edit = document.createElement('a')
        edit.id = 'edit'
        edit.className = 'btn btn-primary'
        edit.innerText = 'Edit'
        const deleteBtn = document.createElement('a')
        deleteBtn.id = 'delete'
        deleteBtn.className = 'btn btn-secondary'
        deleteBtn.innerText = 'Delete'

        buttons.append(edit,deleteBtn)
        cardBody.append(h5,date,text,buttons)
        newCard.append(cardBody)
        diaryOutputs.append(newCard)

        newCard.addEventListener('click',(e)=>{
            e.target.remove()
        })
    }    
}

diaryEdit.addEventListener('click', editItem)

function editItem(e){
    e.preventDefault()
    let element = e.target
    console.log(element)
}

diaryDelete.addEventListener('click', deleteItem)

function deleteItem(e){
    e.preventDefault()
    console.log(e.target)
}

async function fetchDiary(data) {
    try {
        const response = await fetch(`https://fruit-api-5v0j.onrender.com/fruits/${data}`)
        if (response.ok) {
            const data = await response.json()
            entry(data)
        } else {
            throw "Error http status code " + response.status
        }
    } catch (err) {
        console.log(err)
    }
}

async function getAll(){
    const data = await fetchDiary()

    data.forEach(element => {
        const newCard = document.createElement('div')
        newCard.className = 'card mt-1'
        const cardBody = document.createElement('div')
        cardBody.className = 'card-body'
        const h5 = document.createElement('h5')
        h5.className = 'card-title'
        h5.innerText = element.title
        const date = document.createElement('p')
        date.innerText = element.date
        const text = document.createElement('p')
        text.className = 'card-text'
        text.innerText = element.entry
        const buttons = document.createElement('div')
        buttons.className = 'd-flex justify-content-start gap-1'
        const edit = document.createElement('a')
        edit.id = 'edit'
        edit.className = 'btn btn-primary'
        edit.innerText = 'Edit'
        const deleteBtn = document.createElement('a')
        deleteBtn.id = 'delete'
        deleteBtn.className = 'btn btn-secondary'
        deleteBtn.innerText = 'Delete'

        console.log('hit')
        buttons.append(edit,deleteBtn)
        cardBody.append(h5,date,text,buttons)
        newCard.append(cardBody)
        diaryOutputs.append(newCard)
    });   
}
