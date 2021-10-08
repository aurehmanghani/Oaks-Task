const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({

    
    project_name: {type: String,required: true},
    task_list : [ 
        { 
            text : {type: String,required: true}, 
            completed : {type: Boolean,default: false}, 
        }               
    ]



});

const Task = mongoose.model('task', TaskSchema);
module.exports = Task;
