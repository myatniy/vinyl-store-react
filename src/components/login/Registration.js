import {Form, Input, Button, message, Checkbox} from "antd";
import {useStoreon} from "storeon/react";
import {useHistory} from "react-router-dom";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

export default function Registration() {
    const {dispatch} = useStoreon();
    const history = useHistory();

    const onFinish = ({username, password, isAdmin}) => {
        dispatch("users/post", {
            "Username": username,
            "Password": password,
            "IsAdmin": isAdmin
        });
        message.success("Аккаунт успешно создан");
        history.push("/login");
    };

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "25%"}}>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item {...tailLayout} name="isAdmin" valuePropName="checked">
                    <Checkbox>Is Admin</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};