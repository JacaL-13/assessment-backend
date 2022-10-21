const complimentBtn = document.getElementById('complimentButton')
const fortuneForm = document.getElementById('fortuneForm')
const fortuneType = document.getElementById('fortuneType')

const baseUrl = 'http://localhost:4000/api/'

// function getFortuneTypes() {
//     axios.get(baseUrl + 'fortune/')
// }

const getCompliment = () => {
	axios.get(baseUrl + 'compliment/').then((res) => {
		const data = res.data
		alert(data)
	})
}
function getFortune(event) {
    event.preventDefault()
    axios.get(baseUrl + 'fortune/' + fortuneType.value).then((res) => {
        alert(res.data.text)
    })
}

complimentBtn.addEventListener('click', getCompliment)
fortuneForm.addEventListener('submit', getFortune)
