const express = require('express');
const createError = require('http-errors');
const dotenv = require('dotenv').config();
const cors = require('cors');
require('./initDB')();

const app = express();

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(cors());



const TaskRoute = require('./Routes/Task.route');
app.use('/api/tasks', TaskRoute);


app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started @ port number ${port}`);
});
