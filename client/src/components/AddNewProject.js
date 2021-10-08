import { Form, Input, Button, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AddNewProject = () => {


  const [form] = Form.useForm();

  const onFinish = async (values: any) => {

    const taskList = values.task_list.map((tl) => {

      return {
        text: tl,
        completed: false,
      };
    });

    let formData = {
      project_name: values.project_name,
      task_list: taskList,
    };

    try {

      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const response = await fetch("http://localhost:8080/tasks", config);
      const json = await response.json();

      if (response.ok) {
        message.success('Project Save Successfully');
        form.resetFields();
      } else {
        message.error('Some error occured');
      }
    } catch (error) {
      return error;
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <b>+ Create Project</b>
      <Form.Item
        name="project_name"
        label="Projct Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.List
        name="task_list"
        rules={[
          {
            validator: async (_, task_list) => {
              if (!task_list || task_list.length < 1) {
                return Promise.reject(new Error("At least 1 passengers"));
              }
            },
          },
        ]}
        className="ant-col-8"
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? "Tasks" : ""}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input task name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="Task name" style={{ width: "60%" }} />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "100%" }}
                icon={<PlusOutlined />}
              >
                Add field
              </Button>

              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddNewProject;
