const fortunes = require('./fortune.json')

const savedFortunes = [
    { id: 9990, text: 'Test1' },
    { id: 9991, text: 'Test2' }
]

function moveArrElem(array, moveIdx, movement) {
    let movingVal = array.splice(moveIdx, 1)[0]
	array.splice(+moveIdx + +movement, 0, movingVal)
	return array
}

let move = 0
// test
// moveArrElem(savedFortunes, 1, -1)

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortune: (req,res) => {
        if (req.params.type === 'default') {
            res.status(200).send(fortunes[Math.floor(Math.random() * fortunes.length)])
        } else {
            const filteredFortunes = fortunes.filter((elem) => elem.type === req.params.type)
            let randomFortune = filteredFortunes[Math.floor(Math.random() * filteredFortunes.length)]
            res.status(200).send(randomFortune)
        }
    },
    getAllFortunes: (req, res) => {
        res.status(200).send(savedFortunes)
    },
    saveFortune: (req, res) => {
        savedFortunes.push(req.body)
        res.status(200).send()
    },
    moveFortune: (req, res) => {
        if (req.body.movement === '↓') {
            move = 1
        } else {
            move = -1
        }
        moveArrElem(savedFortunes, req.body.id, move)
        move = 0
        res.status(200).send()
    },
    getFortuneTypes: (req, res) => {
        res.status(200).send()
    },
    tieFortune: (req, res) => {
        console.log(req.query.id)
        savedFortunes.splice(req.query.id, 1)
        res.status(200).send()
    }
}