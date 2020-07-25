const express = require('express');
const router = express.Router();

const drivers = [
  {id: 1, firstName: 'Michael', lastName: 'Scott', task: [{id: 1, description: 'Pick-up',time: "", location: "" }]},
  {id: 2, firstName: 'Dwight', lastName: 'Schrute', task: [{id: 2, description: 'Deliver',time: "", location: "" }]},
  {id: 3, firstName: 'Jim', lastName: 'Halpert', task: [{id: 1, description: 'Pick-up',time: "", location: "" }, {id: 3, description: 'Other',time: "", location: "" }]}
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

// router.post('/api/drivers/:id/new', (req, res) => {
//   const newTask = getDriverById(Number(req.params.id));
//   newTask[0].push({id: 1, description: 'Other1',time: "2", location: "3" });
//   res.send('created new task for ', req.params.id)
// })

module.exports = router;