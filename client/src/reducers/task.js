import {GET_Tasks,COMPLETE_TASK} from '../actions/constants';


const taskReducer = (state = {}, { type, payload }) => {
  switch (type) {

    case GET_Tasks:
      return {...state, task : payload};
    case COMPLETE_TASK:
      let index = state.tasks.findIndex(task => task._id === payload._id);
      console.log(index);
      let tasks = [...state.tasks];
      //tasks[index] = {...tasks[index], completed: type.completed};
      return {...state, tasks}
      //return {...state, task : payload};
    default:
      return state;
  }
  
};


export default taskReducer;
