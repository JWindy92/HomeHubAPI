

module.exports = function(app) {

    app.get('/testing', (req, res) => {
        res.json({"working": "I am a genius"})
    })

}


