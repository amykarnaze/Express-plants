const express = require('express');
const app = express();
app.use(express.json())


app.set('port', process.env.PORT || 3000);
app.locals.title = 'Plants';
app.locals.plants = [
  { id: '1', name: 'Sage', family: 'Lamiaceae' },
  { id: '2', name: 'Chamomile', family: 'Asteraceae' },
  { id: '3', name: 'Lemon balm', family: 'Lamiaceae' }

]

app.get('/', (request, response) => {
  response.send('Check out these plants');
});

app.get('/api/v1/plants', (request, response) => {
  response.status(200).json(app.locals.plants)

});

app.get('/api/v1/plants:id', (request, response) => {
  const id = request.params.id;
  const foundPlant = app.locals.plants.find(plant => plant.id === id);
  if (!foundPlant) {
    response.status(404).json({
      errorMessage: `Plant w an id of ${id} not found`
    })
  }

  response.status(200).json(foundPlant);
});