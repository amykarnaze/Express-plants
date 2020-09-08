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

app.post('/api/v1/plants', (request, response) => {
  const requiredProperties = ['name', 'family'];
  for (let property of requiredProperties) {
    if (!request.body[property]) {
      return response.status(422).json({
        errorMessage: `Cannot POST: no property of ${property} in request`
      })
    }
  }
  const { name, family } = request.body;
  const id = Date.now();
  app.locals.plants.push({ id, name, family })
  response.status(201).json({ id, name, family })
});
