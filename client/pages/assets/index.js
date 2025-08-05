const API_URL = '108.142.77.58:3000'

const searchForm = document.querySelector('#search-form')

const diaryEntry = document.querySelector('#diaryEntry')
const diaryEdit = document.querySelector('#default #edit')
const diaryDelete = document.querySelector('#default #delete')
const diaryOutputs = document.querySelector('#diaryOutputs')
const diaryDefault = document.querySelector('#default')
const diaryCards = document.querySelector('.card')

const getAll = document.querySelector('#getAll')

document.querySelector('#logoutBtn').addEventListener('click', function (e) {
    e.preventDefault()
    localStorage.removeItem('token')
    window.location.href = 'login.html'
    
})

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
    console.log(formObject)
    if (formObject){
        if (formObject.category && formObject.text && formObject.title){
            addCard(formObject)
            postCard(formObject)
            diaryEntry.reset();
        } else {
            alert('Please complete the form with category, title, date, diary entry, and rating.')
        }
       
    }    
}

async function postCard(data) {
    try {
        const response = await fetch(`http://${API_URL}/diary/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            },
            body: JSON.stringify({
                category: data.category,
                text: data.text,
                title: data.title,
                rating: data.rating
            })
        })
        if (response.ok) {
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
        const response = await fetch(`http://${API_URL}/diary/${data}`)
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

        deleteDiaryEntry(card.id,e)
        card.remove(); // Remove the card from the DOM
    }
}

async function deleteDiaryEntry(id,e) {
    try {
        const response = await fetch(`http://${API_URL}/diary/${id}`, {
            method: 'DELETE'
        });

        if (response.ok){
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
    const options = {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    }
    try {
        const response = await fetch(`http://${API_URL}/diary`, options)
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

getAll.addEventListener('click',getAllEntries)

function getAllEntries(e){
    e.preventDefault()
    fetchDiary()
}

function entry(data){
    data.forEach(element => {
        addCard(element)
    });  
}

function addCard(element){

    if (document.getElementById(element.id)) {
        return;
    }

    const newCard = document.createElement('div')
    newCard.className = 'card mt-1'
    newCard.id = element.id
    const cardBody = document.createElement('div')
    cardBody.className = 'card-body'
    const titleRow = document.createElement('div')
    titleRow.className = 'd-flex justify-content-between align-items-center mb-3'

    const h5 = document.createElement('h5')
    h5.className = 'card-title mb-0'
    h5.innerText = element.title

    const date = document.createElement('p')
    date.className = 'date mb-0 text-muted'
    date.innerText = element.category + ' : ' + ' Rating: ' + element.rating + ' : ' + element.date.split('T')[0]

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

    titleRow.appendChild(h5)
    titleRow.appendChild(date)

    buttons.append(edit,deleteBtn)
    cardBody.append(titleRow, text, buttons)
    newCard.append(cardBody)
    diaryOutputs.append(newCard)
}

document.getElementById('editForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const title = document.getElementById('editTitle').value;
    const text = document.getElementById('editText').value;
    const id = document.getElementById('editId').value;
    
    try {
        const res = await fetch(`http://${API_URL}/diary/${id}`, {
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

const ratingContainer = document.getElementById('ratingContainer');
const ratingValue = document.getElementById('ratingValue');
const ratingDisplay = document.getElementById('ratingDisplay');

for (let i = 1; i <= 10; i++) {
    const saturation = 10 + ((i - 1) * (60 / 9));   // Saturation from 10% (almost grey) to 70% (blue)
    const lightness = 90 - ((i - 1) * (15 / 9));    // Lightness from 90% (whitish) to 75% (blue)
    const hue = 220;                                 // Fixed blue hue
  
    const box = document.createElement('div');
    box.classList.add('rating-box');
    box.dataset.value = i;
    box.textContent = i;
    box.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    box.addEventListener('click', () => {
        document.querySelectorAll('.rating-box').forEach(b => b.classList.remove('selected'));
        box.classList.add('selected');
        ratingValue.value = i;
    });

    ratingContainer.appendChild(box);
}

function updateName(){
    const name = localStorage.getItem('name')
    document.querySelector('h1').innerText = 'Welcome ' + name.split(' ')[0].split('"')[1] + ' to Diary a Day'
}

updateName()
