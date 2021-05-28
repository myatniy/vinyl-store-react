import {Button, Form, Select, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {useStoreon} from "storeon/react";
import devAxios from "../../devAxios";

export default function SecondStep({onNextClick, lastInsertedAlbum}) {
    const {genres} = useStoreon("genres");

    const onFinish = ({genresLocal}) => {
        for (let i = 0; i < genresLocal.length; i++) {
            devAxios.post("/albumHasGenre", {
                "AlbumId": lastInsertedAlbum,
                "GenreId": genres.find(item => item.value === genresLocal[i].name).id,
            }).then(res => console.log(res));
        }
        onNextClick();
    };

    return (
        <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
            <Form.List name="genresLocal">
                {(fields, {add, remove}) => (
                    <>
                        {fields.map(({key, name, fieldKey, ...restField}) => (
                            <Space key={key} style={{display: "flex", marginBottom: 8}} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, "name"]}
                                    fieldKey={[fieldKey, "name"]}
                                    rules={[{required: true, message: "Нельзя оставлять пустым"}]}
                                    style={{width: "700px"}}
                                >
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {genres.map(item => (
                                            <Select.Option key={item.id} value={item.value}>
                                                {item.value}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                {/*<Form.Item*/}
                                {/*    {...restField}*/}
                                {/*    name={[name, 'last']}*/}
                                {/*    fieldKey={[fieldKey, 'last']}*/}
                                {/*    rules={[{ required: true, message: 'Missing last name' }]}*/}
                                {/*>*/}
                                {/*    <Input placeholder="Last Name" />*/}
                                {/*</Form.Item>*/}
                                <MinusCircleOutlined onClick={() => remove(name)}/>
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                Добавить жанр
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button style={{float: "right"}} type="primary" htmlType="submit">
                    Далее
                </Button>
            </Form.Item>
        </Form>
    );
}