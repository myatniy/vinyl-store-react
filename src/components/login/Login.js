import {Form, Input, Button, message} from "antd";
import {useStoreon} from "storeon/react";
import {Link, useHistory} from "react-router-dom";

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

export default function Login({setLoggedUser}) {
    const {users} = useStoreon("users");
    const history = useHistory();

    const onFinish = ({username, password}) => {
        const findUser = users.find(item => item.username === username && item.password === password);

        if (findUser === undefined)
            return message.error("Неверный логин либо пароль");

        message.success("Вход выполнен успешно");
        setLoggedUser(() => findUser);
        history.push("/");
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

                <div style={{marginBottom: "20px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Link to="/registration">Создать аккаунт</Link>
                </div>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};