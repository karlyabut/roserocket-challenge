const express = require('express');
const app = express();
const port = 5000;

const drivers = [
  {id: 1, firstName: 'Michael', lastName: 'Scott', task: [{taskID: 1, taskName: "Pick-up"}]},
  {id: 2, firstName: 'Dwight', lastName: 'Schrute', task: [{taskID: 2, taskName: "Deliver"}]},
  {id: 3, firstName: 'Jim', lastName: 'Halpert', task: [{taskID: 3, taskName: "Other"}, {taskID: 1, taskName: "Pick-up"}]}
];
function getDriverById(id){
  let driverById = drivers.filter(driver => {
    return driver.id === id;
  })
  return driverById;
}

app.get('/api/drivers', (req, res) => {
  res.json(drivers);
})

app.get('/api/drivers/:id', (req, res) => {
  res.send(getDriverById(Number(req.params.id)))
})

app.listen(port, () => console.log(`Listening on port ${port}`));