const express = require('express');
const app = express();
const PORT = 4000;
const reportItems = require('./data/reports.json');
const fs = require('fs');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
});

app.use(express.json());

app.get('/', function (req, res) {
    res.send('get endpoint works!');
});

app.get('/reports/get-spam-items', (req, res) => {
    const items = Object.values(reportItems);
    //send filtered info: id, type, state, message
    const spamItems = filterSpamItems(reportItems.elements);
    const filteredSpamItems = filterNeededFields(spamItems);
    res.send(filteredSpamItems);
});

app.put('/reports/block-spam-item', (req, res) => {
  console.log('301 req', req.body);
  const id = req.body.id;
  const itemIdx = reportItems.elements.findIndex(item => item.id === id);
  //replace state of item
  if(itemIdx > -1) {
    reportItems.elements[itemIdx].state = 'BLOCKED';
  }
  //save the json to file
  const reportItemString = JSON.stringify(reportItems, null, 4);
  fs.writeFile('./src/data/reports.json', reportItemString, (err) => {
    if (err) throw err;
  });

  console.log('item', itemIdx);
  res.send(`This spam id=${id} is blocked`);
});

app.put('/reports/:reportId', (req, res) =>{
  console.log(' 401 req.params', req.params);
  console.log('402 req.body', req.body);
  const data = req.body;
  const id = req.params.reportId;
  const itemIdx = reportItems.elements.findIndex(item => item.id === id);
  //replace state of item
  if(itemIdx > -1) {
    reportItems.elements[itemIdx].state = 'CLOSED';
  }
  //save the json to file
  const reportItemString = JSON.stringify(reportItems, null, 4);
  fs.writeFile('./src/data/reports.json', reportItemString, (err) => {
    if (err) throw err;
  });
  



  res.send(req.params);
});


const filterNeededFields = ( items ) => {
  return items.map(item => (
    { 
      'id': item.id,
      'type': item.payload.reportType,
      'state': item.state,
      'message': item.payload.message
   }
  ));
}

const filterSpamItems = ( items ) => {
  return items.filter(entry => entry.payload.reportType === 'SPAM' && entry.state !== 'CLOSED');
}
app.listen(PORT, function () {
    console.log(`Spam report API ready on http://localhost:${PORT}`);
});
