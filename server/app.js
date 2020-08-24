const express = require('express');
const fs = require('fs').promises;

const jsonFile = './data.json';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/tickets', async (req, res) => {
  const winnersLog = await fs.readFile(jsonFile, { encoding: 'utf-8' });
  if (req.query.searchText) {
    const filteredList = JSON.parse(winnersLog)
      .filter((item) => item.title.toLowerCase().indexOf(req.query.searchText.toLowerCase()) !== -1);
    res.send(JSON.stringify(filteredList));
  } else {
    res.send(winnersLog);
  }
});

module.exports = app;
