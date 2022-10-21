const complimentBtn = document.getElementById('complimentButton')
const fortuneForm = document.getElementById('fortuneForm')
const fortuneType = document.getElementById('fortuneType')
const currFortune = document.getElementById('currFortune')
const fortuneText = document.getElementById('currForText')
const docSavedFortunes = document.getElementById('savedFortunes')
const tied = document.getElementById('tied')

const baseUrl = 'http://localhost:4000/api/'

function getSaved() {
    docSavedFortunes.innerHTML = ''
    axios.get(baseUrl + 'fortunes/').then((res) => {
        for (let i = 0; i < res.data.length; i++) {
            const fromSaved = document.createElement('p')
            fromSaved.textContent = res.data[i].text + ' '
            fromSaved.id = i
            const upBtn = document.createElement('button')
            const dnBtn = document.createElement('button')
            upBtn.textContent = '↑'
            dnBtn.textContent = '↓'
            upBtn.classList.add('upDnBtns')
            dnBtn.classList.add('upDnBtns')
            upBtn.addEventListener('click', moveUpDn)
            dnBtn.addEventListener('click', moveUpDn)

            const tieBtn = document.createElement('button')
            tieBtn.textContent = 'Tie Fortune'
            tieBtn.addEventListener('click', tieFortune)
            tieBtn.classList.add('smallBtn')

            docSavedFortunes.appendChild(fromSaved)
            fromSaved.appendChild(upBtn)
            fromSaved.appendChild(dnBtn)
            fromSaved.appendChild(tieBtn)
        }
    }).catch(err => console.log(err))
}

getSaved()

const getCompliment = () => {
	axios.get(baseUrl + 'compliment/').then((res) => {
		const data = res.data
		alert(data)
	})
}

let currFortuneObj

function getFortune(event) {
    event.preventDefault()

    if (currFortuneObj !== undefined) {
        alert('You already have a fortune. Tie it or save it to get a new one.')
    } else {
    
        currFortune.innerHTML = ''

        axios.get(baseUrl + 'fortune/' + fortuneType.value).then((res) => {
            const saveForBtn = document.createElement('button')
            saveForBtn.textContent = 'Save Fortune'
            saveForBtn.classList.add('smallBtn')
            saveForBtn.addEventListener('click', saveFortune)
            currFortuneObj = res.data
            fortuneText.textContent = currFortuneObj.text

            const tieBtn = document.createElement('button')
            tieBtn.textContent = 'Tie Fortune'
            tieBtn.addEventListener('click', () => {
                currFortune.innerHTML = ''
                currFortuneObj = undefined
            })
            tieBtn.classList.add('smallBtn')

            currFortune.appendChild(fortuneText)
            currFortune.appendChild(saveForBtn)
            currFortune.appendChild(tieBtn)
        })
    }
}

function saveFortune(event) {
    axios.post(baseUrl + 'fortune/savefortune', currFortuneObj).then((res) => {
        getSaved()
        currFortune.innerHTML = ''
        currFortuneObj = undefined
    }).catch(err => console.log(err))
}

function moveUpDn(event) {
    body = {
        id: event.target.parentElement.id,
        movement: event.target.textContent
    }
    axios.put(baseUrl + 'fortune/', body).then((res) => {
        getSaved()
    }).catch(err => console.log(err))
}

function tieFortune(event) {
    axios.delete(baseUrl + 'fortune/?id=' + event.target.parentElement.id).then((res) => {
        getSaved()
    }).catch(err => console.log(err))
}

complimentBtn.addEventListener('click', getCompliment)
fortuneForm.addEventListener('submit', getFortune)
