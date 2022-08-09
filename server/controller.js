let shows = require('./db.json');
let globalID = 5;


module.exports = {
    getShows: (req, res) => {
        res.status(200).send(shows)
 },

deleteShow: (req, res) => {
    let index = shows.findIndex(elem => elem.id === +req.params.id);
    shows.splice(index, 1);
    res.status(200).send(shows);
},

createShow: (req, res) => {
    const {name,rating,imageURL} = req.body;
    let newShow = {
        id: globalID,
        name,
        rating: +rating,
        imageURL 
    }
    shows.push(newShow);
    globalID++;
    res.status(200).send(shows)
},
updateShow: (req, res) => {
    const {type} = req.body
    let index = shows.findIndex(elem => elem.id === +req.params.id)
    if(type === 'minus' && shows[index].rating > 1){
        shows[index].rating -= .5;
        res.status(200).send(shows)
    } else if(type === 'plus' && shows[index].rating < 10){
        shows[index].rating += .5;
        res.status(200).send(shows)
    } else {
        res.status(400).send('Invalid star rating')
    }
}
}