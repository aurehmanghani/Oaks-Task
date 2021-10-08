import {GET_Tasks} from './constants';

const getAllTasks = async (dispatch) => {
  fetch("http://localhost:8080/api/tasks")
    .then((res) => res.json())
    .then((res) => {
      dispatch({ type: GET_Tasks, payload: res })
    } 
  );
};

export default getAllTasks;
