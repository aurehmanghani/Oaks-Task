const createError = require('http-errors');
const mongoose = require('mongoose');

const Task = require('../Models/Task.model');

module.exports = {
  getAllTasks: async (req, res, next) => {
    try {
      const results = await Task.find({}, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewTask: async (req, res, next) => {
    try {
      const task = new Task(req.body);
      console.log(req.body);
      const result = await task.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }

    /*Or:
  If you want to use the Promise based approach*/
    /*
  const Task = new Task({
    name: req.body.name,
    price: req.body.price
  });
  Task
    .save()
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err.message);
    }); 
    */
  },

  findTaskById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const task = await Task.findById(id);
      if (!task) {
        throw createError(404, 'Task does not exist.');
      }
      res.send(task);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid task id'));
        return;
      }
      next(error);
    }
  },

  findTaskBySubId: async (req, res, next) => {
    const id = req.params.id;
    const checked = req.params.checked;
    let task;
    console.log(typeof(checked))
    try {

      if(checked === "true"){
        console.log(1,checked);
        task = await Task.findOneAndUpdate({"task_list": {$elemMatch: {_id: id}}},
        {$set: {'task_list.$.completed': true,}},{'new': true, 'safe': true, 'upsert': true});
      }else{
        console.log(2,checked);
        task = await Task.findOneAndUpdate({"task_list": {$elemMatch: {_id: id}}},
        {$set: {'task_list.$.completed': false,}},{'new': true, 'safe': true, 'upsert': true});
      }

      if (!task) {
        throw createError(404, 'Task does not exist.');
      }
      res.send(task);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid task id'));
        return;
      }
      next(error);
    }
  },

  

  updateATask: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Task.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Task does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Task Id'));
      }

      next(error);
    }
  },

  deleteATask: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Task.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Task does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Task id'));
        return;
      }
      next(error);
    }
  }
};
