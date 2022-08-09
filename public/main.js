const showsContainer = document.querySelector('#shows-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4040/api/shows`

const showsCallback = ({ data: shows }) => displayShows(shows)
const errCallback = err => console.log(err)

const getAllShows = () => axios.get(baseURL).then(showsCallback).catch(errCallback)
const createShow = body => axios.post(baseURL, body).then(showsCallback).catch(errCallback)
const deleteShow = id => axios.delete(`${baseURL}/${id}`).then(showsCallback).catch(errCallback)
const updateShow = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(showsCallback).catch(errCallback)
function submitHandler(e) {
    e.preventDefault()

    let name = document.querySelector('#name')
    let rating = document.querySelector('#rating')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        name: name.value,
        rating: rating.value, 
        imageURL: imageURL.value
    }

    createShow(bodyObj)

    name.value = ''
    rating.value = ''
    imageURL.value = ''
}

function createShowCard(shows) {
    const showCard = document.createElement('div')
    showCard.classList.add('show-card')

    showCard.innerHTML = `<img alt='show cover image' src=${shows.imageURL} class="show-cover-image"/>
    <p class="name">${shows.name}</p>
    <div class="btns-container">
        <button onclick="updateShow(${shows.id}, 'minus')">-</button>
        <p class="show-rating">${shows.rating}</p>
        <button onclick="updateShow(${shows.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteShow(${shows.id})">delete</button>
    <div class="rating">
            <input type='radio' hidden name='rate' id='rating-opt5' data-idx='0'>	
            <label for='rating-opt5'><span>Really Enjoyed</span></label>
       
            <input type='radio' hidden name='rate' id='rating-opt4' data-idx='1'>
            <label for='rating-opt4'><span>It Was Good</span></label>
       
            <input type='radio' hidden name='rate' id='rating-opt3' data-idx='2'>
            <label for='rating-opt3'><span>Not Bad</span></label>
       
            <input type='radio' hidden name='rate' id='rating-opt2' data-idx='3'>
            <label for='rating-opt2'><span>Disliked</span></label>
       
             <input type='radio' hidden name='rate' id='rating-opt1' data-idx='4'>
            <label for='rating-opt1'><span>Very Dissatisfied</span></label> 
          </div>
    `


    showsContainer.appendChild(showCard)
}

function displayShows(arr) {
    showsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createShowCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllShows()