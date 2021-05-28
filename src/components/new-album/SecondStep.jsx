import {Button, Form, Select, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {useStoreon} from "storeon/react";

export default function SecondStep({onNextClick, lastInsertedAlbum}) {
    const {dispatch, genres} = useStoreon("genres");

    const onFinish = ({genresLocal}) => {
        const uniqueGenres = new Set();
        genresLocal.map(genre => uniqueGenres.add(genre.name));
        const arrUniqueGenres = [...uniqueGenres];

        for (let i = 0; i < arrUniqueGenres.length; i++) {
            dispatch("albumHasGenres/post", {
              "AlbumId": lastInsertedAlbum,
              "GenreId": genres.find(item => item.value === arrUniqueGenres[i]).id,
            });
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