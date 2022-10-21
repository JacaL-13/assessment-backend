const fortunes = require('./fortune.json')

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
    getFortuneTypes: (req,res) => {
        res.status(200).send()
    }

}