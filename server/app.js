const express = require('express');
const fs = require('fs').promises;

const jsonFile = './data.json';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// returns the json array from the data file. if query param "searchText" exits, it returns a filtered array of the items titles.
app.get('/api/tickets', async (req, res) => {
  const data = await fs.readFile(jsonFile, { encoding: 'utf-8' });
  if (req.query.searchText) {
    const filteredList = JSON.parse(data)
      .filter((item) => item.title.toLowerCase().indexOf(req.query.searchText.toLowerCase()) !== -1);
    res.send(filteredList);
  } else {
    res.send(JSON.parse(data));
  }
});

// gets an id in the params and gives/changes the done property of that item to true.
app.post('/api/tickets/:ticketId/done', async (req, res) => {
  const data = await fs.readFile(jsonFile, { encoding: 'utf-8' });
  const parsedData = JSON.parse(data);
  let updated = false;
  parsedData.forEach((item, i) => {
    if (item.id === req.params.ticketId) {
      parsedData[i].done = true;
      updated = true;
    }
  });

  fs.writeFile(jsonFile, JSON.stringify(parsedData));

  res.send({ updated });
});

// gets an id in the params and gives/changes the done property of that item to false.
app.post('/api/tickets/:ticketId/undone', async (req, res) => {
  const data = await fs.readFile(jsonFile, { encoding: 'utf-8' });
  const parsedData = JSON.parse(data);
  let updated = false;
  parsedData.forEach((item, i) => {
    if (item.id === req.params.ticketId) {
      parsedData[i].done = false;
      updated = true;
    }
  });
  fs.writeFile(jsonFile, JSON.stringify(parsedData, null, 2));
  res.send({ updated });
});

app.post('/api/tickets', async (req, res) => {
  const data = await fs.readFile(jsonFile, { encoding: 'utf-8' });
  const parsedData = JSON.parse(data);
  parsedData.push(req.body);
  await fs.writeFile(jsonFile, JSON.stringify(parsedData, null, 2));
  res.send(parsedData[parsedData.length - 1]);
});

module.exports = app;
