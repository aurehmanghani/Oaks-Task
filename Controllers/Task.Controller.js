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

  

  
};
