import React,{useEffect} from "react";
import { connect, useDispatch } from "react-redux";
import getAllTasks from "../actions/task";
import { Table, Button, Space } from 'antd';
import { Link } from "react-router-dom";

function ListAllTasks(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTasks)
  }, [dispatch]);

  const dataSource = props.tasks;


  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'project_name',
      key: 'project_name',
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render: (dataIndex) => (
        <Space size="middle">
          <Link to={'view-project/' + dataIndex}>View Project</Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="App">
      <Button type="link" style={{float: 'right'}} href=""> + Add Project</Button>

      <Table dataSource={dataSource} columns={columns}   rowKey="_id"/>;

    </div>
  );

}

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

export default connect(mapStateToProps, mapDispatchToProps)(ListAllTasks);
