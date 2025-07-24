const searchForm = document.querySelector('#search-form')
const diaryEntry = document.querySelector('#diaryEntry')
const diaryEdit = document.querySelector('#default #edit')
const diaryDelete = document.querySelector('#default #delete')
const diaryOutputs = document.querySelector('#diaryOutputs')
const diaryDefault = document.querySelector('#default')
const diaryCards = document.querySelector('.card')
const getAll = document.querySelector('#getAll')

searchForm.addEventListener('submit',search)

function search(e){
    e.preventDefault()
    let searchQuery = e.target[0].value 
    if (searchQuery=="diary"){
        console.log('hit')
    }
    console.log(searchQuery)
    e.target[0].value = ""
}

diaryEntry.addEventListener('submit',newItem)

function newItem(e){
    e.preventDefault()
    const formData = new FormData(diaryEntry);
    const formObject = Object.fromEntries(formData.entries()); // Convert FormData to an object

    if (formObject){
        if (formObject.category && formObject.category){
            addCard(formObject)
            postCard(formObject)
            diaryEntry.reset();
        } else {
            alert('Please complete the form with category and diary entry')
        }
       
    }    
}

async function postCard(data) {
    try {
        console.log(data.date)
        const response = await fetch(`http://localhost:3003/diary/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category: data.category,
                text: data.text,
                title: data.title
            })
        })
        if (response.ok) {
            console.log('hit')
            const postedCard = await response.json()
            console.log(postedCard)
        } else {
            throw "Error http status code " + response.status
        }
    } catch (err) {
        console.log(err)
    }
}

async function getNewCard(data) {
    try {
        const response = await fetch(`http://localhost:3003/diary/${data}`)
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

// diaryEdit.addEventListener('click', editItem)

function editItem(e) {
    e.preventDefault()
    const card = e.target.closest('.card');
    if (card) {
        const title = card.querySelector('.card-title').innerText;
        const text = card.querySelector('.card-text').innerText;
        
        document.getElementById('editTitle').value = title;
        document.getElementById('editText').value = text;
        document.getElementById('editId').value = card.id;
        
        document.getElementById('editModal').classList.remove('d-none');
    }
}


    
function deleteItem(e){
    e.preventDefault()

    const confirmed = confirm("Are you sure you want to delete this diary entry?")
    if (!confirmed) return 

    console.log(e.target)
    const card = e.target.closest('.card'); // Find the closest parent with the class 'card'
    if (card) {
        const cardTitle = card.querySelector('.card-title')
        const cardDate = card.querySelector('.date')

        console.log("Deleting card with title:", cardTitle.innerText);
        console.log("Deleting card with title:", cardDate.innerText);
        console.log(card.id);

        deleteDiaryEntry(card.id,e)
        card.remove(); // Remove the card from the DOM
    }
}

async function deleteDiaryEntry(id,e) {
    try {
        const response = await fetch(`http://localhost:3003/diary/${id}`, {
            method: 'DELETE'
        });

        if (response.ok){
            console.log('delete entry with ID:', id);
            const card = e.target.closest('.card');
            card.remove();
        } else {
            console.error('Failed to detect entry. Status:', response.status);
        }
    } catch (err) {
        console.error('Error deleting entry', err)
    }
}

async function fetchDiary() {
    try {
        const response = await fetch(`http://localhost:3003/diary`)
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            entry(data)
        } else {
            throw "Error http status code " + response.status
        }
    } catch (err) {
        console.log(err)
    }
}

getAll.addEventListener('click',getAllEntries)

function getAllEntries(e){
    e.preventDefault()
    fetchDiary()
}

function entry(data){
    console.log(data)
    data.forEach(element => {
        addCard(element)
        console.log(element);
    });  
}
function addCard(element){
    const newCard = document.createElement('div')
        newCard.className = 'card mt-1'
        newCard.id = element.id
        const cardBody = document.createElement('div')
        cardBody.className = 'card-body'
        const h5 = document.createElement('h5')
        h5.className = 'card-title'
        h5.innerText = element.title
        const date = document.createElement('p')
        date.className = 'date'
        date.innerText = element.date.split('T')[0]
        const text = document.createElement('p')
        text.className = 'card-text'
        text.innerText = element.text
        const buttons = document.createElement('div')
        buttons.className = 'd-flex justify-content-start gap-1'
        const edit = document.createElement('a')
        edit.id = 'edit'
        edit.className = 'btn btn-primary'
        edit.innerText = 'Edit'
        edit.addEventListener('click', editItem);
        const deleteBtn = document.createElement('a')
        deleteBtn.id = 'delete'
        deleteBtn.className = 'btn btn-secondary'
        deleteBtn.innerText = 'Delete'
        deleteBtn.addEventListener('click', deleteItem);

        buttons.append(edit,deleteBtn)
        cardBody.append(h5,date,text,buttons)
        newCard.append(cardBody)
        diaryOutputs.append(newCard)
}

document.getElementById('editForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const title = document.getElementById('editTitle').value;
    const text = document.getElementById('editText').value;
    const id = document.getElementById('editId').value;
   
    try {
        const res = await fetch(`http://localhost:3003/diary/${id}`, {
            method: 'PATCH', // or 'PATCH'
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, text })
        });
        if (res.ok) {
            alert("Entry updated.");
            location.reload(); // Reload to show updated entry or re-render cards
        } else {
            throw new Error("Update failed");
        }
    } catch (err) {
        console.error(err);
    }

    document.getElementById('editModal').classList.add('d-none');
});

document.getElementById('cancelEdit').addEventListener('click', function() {
    document.getElementById('editModal').classList.add('d-none');
});
