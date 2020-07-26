const express = require('express');
const app = express();
const scheduleRouter = require('./client/src/routes/schedules')
const port = 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.use('/', scheduleRouter);
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Listening on port ${port}`));