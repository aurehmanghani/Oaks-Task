import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import getAllTasks from "../actions/task";
import { Card,Checkbox } from 'antd';
import {COMPLETE_TASK} from '../actions/constants'
const ViewProject = (props) => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const task = props.tasks.find(t => t._id===id);

  function onChange(e) {
    let checked = e.target.checked;
    //console.log(checked)
    fetch("http://localhost:8080/api/tasks/updateStatus/"+e.target.value+"/"+checked)
    .then((res) => res.json())
    .then((res) => {
      //dispatch({ type: COMPLETE_TASK, payload: res })
    });
    //console.log(`checked = ${e.target.value}`);
  }

  let taskList = task.task_list.map((elem)=>
    <p key={elem._id}>{(elem.completed === true) ? <Checkbox onChange={onChange} value={elem._id} defaultChecked disabled/> : <Checkbox onChange={onChange} value={elem._id} />}  {elem.text}</p>
  )

  return (
    <div>
      
      <Card title={task.project_name}  style={{ width: 300,marginTop:50 }}>
        {taskList}
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.task,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTasks: () => dispatch(getAllTasks),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProject);