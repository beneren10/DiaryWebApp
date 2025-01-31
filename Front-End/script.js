const searchForm = document.querySelector('#search-form')
const diaryEntry = document.querySelector('#diaryEntry')
const diaryEdit = document.querySelector('#edit')
const diaryDelete = document.querySelector('#delete')
const diaryOutputs = document.querySelector('#diaryOutputs')
const diaryDefault = document.querySelector('#default')

searchForm.addEventListener('submit',search)

function search(e){
    e.preventDefault()
    let searchQuery = e.target[0].value
    console.log(searchQuery)
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

        console.log('hit')
        buttons.append(edit,deleteBtn)
        cardBody.append(h5,text,buttons)
        newCard.append(cardBody)
        diaryOutputs.append(newCard)
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
    let element = e.target
    console.log(element)
}

