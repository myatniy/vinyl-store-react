import {Form, Select, Button, Input, message} from "antd";
import {useState} from "react";
import {findObject} from "../../utils";
import isValidDate from "../../utils/isValidDate";

const {Option} = Select;

export default function EditRecord({dispatch, records, putEvent, deleteEvent, isDate}) {
    const [form] = Form.useForm();
    const [operationType, setOperationType] = useState("edit");

    const onOperationTypeChange = (value) => (value === "edit")
        ? setOperationType(() => "edit")
        : setOperationType(() => "delete");

    const onFinish = ({existingValue, operationType, newValue}) => {
        if (isDate && operationType === "edit") {
            if (isValidDate(newValue) === false)
                return message.error(`Формат даты должен быть равен [yyyy-mm-dd]`);
        }

        if (operationType === "edit" && existingValue !== undefined) {
            if (findObject(records, newValue) !== undefined) {
                return message.error("Запись с таким значеним уже существует");
            }

            if (newValue !== undefined && newValue !== "") {
                const objectToUpdate = findObject(records, existingValue);
                const updatedObject = {
                    id: objectToUpdate.id,
                    value: newValue,
                }
                dispatch(putEvent, updatedObject);
                form.resetFields();
                return message.success("Запись обновлена");
            } else {
                return message.error("Нет данных для обновления записи");
            }
        } else if (operationType === "delete" && existingValue !== undefined) {
            dispatch(deleteEvent, existingValue);
            form.resetFields();
            return message.success("Запись удалена");
        } else {
            return message.error("Выберите запись");
        }
    }

    return (
        <Form
            form={form}
            name="manipulateExistingRecord"
            initialValues={{
                operationType: operationType,
            }}
            onFinish={onFinish}
            style={{
                display: "flex",
                flexFlow: "column nowrap",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "270px"
            }}
        >
            <h2>Существующая запись</h2>
            <Form.Item name="existingValue" style={{width: "100%"}}>
                <Select
                    showSearch
                    placeholder="Поиск"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {records.map(item => (<Option key={item.id} value={item.value}>{item.value}</Option>))}
                </Select>
            </Form.Item>

            <Form.Item name="operationType" style={{width: "100%"}}>
                <Select onChange={onOperationTypeChange}>
                    <Option value="edit">Изменить</Option>
                    <Option value="delete">Удалить</Option>
                </Select>
            </Form.Item>

            {operationType === "edit" && <Form.Item name="newValue" style={{width: "100%"}}>
                <Input />
            </Form.Item>}

            <Form.Item style={{width: "100%"}}>
                <Button type="primary" htmlType="submit" style={{width: "100%"}}>
                    Выполнить
                </Button>
            </Form.Item>
        </Form>
    );
}
