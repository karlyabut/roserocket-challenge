const express = require('express');
const router = express.Router();

const drivers = [
  {id: 1, firstName: 'Michael', lastName: 'Scott', task: []},
  {id: 2, firstName: 'Dwight', lastName: 'Schrute', task: []},
  {id: 3, firstName: 'Jim', lastName: 'Halpert', task: []}
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
  const driver = getDriverById(Number(req.params.id));
  const task = driver.map(result => {
    return result.task
  })
  res.send(task)
})


module.exports = router;