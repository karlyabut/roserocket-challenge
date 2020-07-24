const express = require('express');
const app = express();
const scheduleRouter = require('./client/src/routes/schedules')
const port = 5000;

app.use('/', scheduleRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));