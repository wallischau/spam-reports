const express = require('express');
const app = express();
const PORT = 4000;
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
  //read json file which stores all report items
  const reportItems = readJsonDataFile('./src/data/reports.json');
  //send filtered info: id, type, state, message
  const spamItems = filterSpamItems(reportItems.elements);
  const filteredSpamItems = filterNeededFields(spamItems);
  res.send(filteredSpamItems);
});


app.put('/reports/block-spam-item', (req, res) => {
  const reportItems = readJsonDataFile('./src/data/reports.json');``
  const id = req.body.id;
  const itemIdx = reportItems.elements.findIndex(item => item.id === id);
  //update the state of item with 'BLOCKED'
  if(itemIdx > -1) {
    reportItems.elements[itemIdx].state = 'BLOCKED';
  }
  //save the change to file
  const reportItemString = JSON.stringify(reportItems, null, 4);
  fs.writeFile('./src/data/reports.json', reportItemString, (err) => {
    if (err) throw err;
  });
  res.send(`This spam id=${id} is blocked`);
});

app.put('/reports/:reportId', (req, res) =>{
  const reportItems = readJsonDataFile('./src/data/reports.json');``
  const data = req.body;
  const id = req.params.reportId;
  const itemIdx = reportItems.elements.findIndex(item => item.id === id);
  //update the state of item to 'CLOSED'
  if(itemIdx > -1) {
    reportItems.elements[itemIdx].state = 'CLOSED';
  }
  //save the change to file
  const reportItemString = JSON.stringify(reportItems, null, 4);
  fs.writeFile('./src/data/reports.json', reportItemString, (err) => {
    if (err) throw err;
  });
  res.send(req.params);
});


//read json file and return the json format
const readJsonDataFile = (file) => {
  let rawData;
  let jsonData;
  try {
    rawData = fs.readFileSync(file); 
  } catch(err) {
    throw err;
  }
  jsonData = JSON.parse(rawData);
  return jsonData;
};

//get selected fields
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

//filter in SPAM items which are not closed
const filterSpamItems = ( items ) => {
  return items.filter(entry => entry.payload.reportType === 'SPAM' && entry.state !== 'CLOSED');
}


app.listen(PORT, function () {
    console.log(`Spam report API ready on http://localhost:${PORT}`);
});
