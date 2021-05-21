import {message, Form, Input, Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {findObject} from "../../utils";

export default function NewRecord({records, dispatch, postEvent}) {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const isThereIdenticalValue = findObject(records, values["postRecord"]);

        if (isThereIdenticalValue === undefined) {
            dispatch(postEvent, values["postRecord"]);
            form.resetFields();
            return message.success("Новая запись успешно создана");
        } else {
            return message.error(`Запись "${values["postRecord"]}" уже существует`);
        }
    }

    const onFinishFailed = () => message.error("Что-то пошло не так");

    return (
        <Form
            form={form}
            name="formRecord"
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{display: "flex", flexFlow: "row nowrap", width: "100%"}}
        >
            <Form.Item
                name="postRecord"
                style={{width: "90%", marginRight: "2%"}}
                rules={[{required: true, message: "Не может быть пустым"}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item style={{width: "8%"}}>
                <Button type="primary" htmlType="submit" icon={<PlusOutlined/>}/>
            </Form.Item>
        </Form>
    );
}
