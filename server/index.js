const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const {getShows, deleteShow, createShow, updateShow} = require('./controller');

app.get('/api/shows', getShows);
app.delete('/api/shows/:id', deleteShow);
app.post('/api/shows', createShow);
app.put('/api/shows/:id', updateShow);


app.listen(4040, () => {console.log('Listening on port 4040')})
