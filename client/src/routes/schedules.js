const express = require('express');
const router = express.Router();

const drivers = [
  {id: 1, firstName: 'Michael', lastName: 'Scott', task: [{taskID: 1, taskName: "Pick-up"}]},
  {id: 2, firstName: 'Dwight', lastName: 'Schrute', task: [{taskID: 2, taskName: "Deliver"}]},
  {id: 3, firstName: 'Jim', lastName: 'Halpert', task: [{taskID: 3, taskName: "Other"}, {taskID: 1, taskName: "Pick-up"}]}
];

const tasks = [
  {id: 1, description: 'Pick-up',time: "", location: "" },
  {id: 2, description: 'Deliver',time: "", location: "" },
  {id: 3, description: 'Other',time: "", location: "" },
];

function getDriverById(id){
  let driverById = drivers.filter(driver => {
    return driver.id === id;
  })
  return driverById;
}

router.get('/api/drivers', (req, res) => {
  res.json(drivers);
})

router.get('/api/drivers/:id', (req, res) => {
  res.send(getDriverById(Number(req.params.id)))
})

module.exports = router;