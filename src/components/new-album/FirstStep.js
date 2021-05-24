import {Button, Form, Input, Select} from "antd";
import {useStoreon} from "storeon/react";

export default function FirstStep({onNextClick}) {
    const {
        countries,
        releasedDates,
        labels,
        styles,
        artists,
        albumTypes
    } = useStoreon("countries", "releasedDates", "labels", "styles", "artists", "albumTypes");

    const onFinish = ({Name, IdentifyingNumber, CountryId, ReleasedId, LabelId, StyleId, ArtistId, TypeOfAlbumId}) => {
        const date = new Date();
        const payload = {
            "Name": Name,
            "IdentifyingNumber": IdentifyingNumber,
            "CreatedOn": date.toString(),
            "CountryId": countries.find(item => item.value === CountryId).id,
            "ReleasedId": releasedDates.find(item => item.value === ReleasedId).id,
            "LabelId": labels.find(item => item.value === LabelId).id,
            "StyleId": styles.find(item => item.value === StyleId).id,
            "ArtistId": artists.find(item => item.value === ArtistId).id,
            "TypeOfAlbumId": albumTypes.find(item => item.value === TypeOfAlbumId).id,
        }
        console.log("payload", payload);
        // onNextClick();
    };

    return <Form
        name="firstStep"
        initialValues={{remember: false}}
        onFinish={onFinish}
    >
        <Form.Item
            label="Название альбома"
            name="Name"
            rules={[{required: true, message: "Нельзя оставлять пустым"}]}
        >
            <Input/>
        </Form.Item>

        <Form.Item
            label="Идентификационный номер"
            name="IdentifyingNumber"
            rules={[{required: true, message: "Нельзя оставлять пустым"}]}
        >
            <Input/>
        </Form.Item>

        <Form.Item
            label="Страна"
            name="CountryId"
            rules={[{required: true, message: "Нельзя оставлять пустым"}]}
        >
            <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {countries.map(item => (<Select.Option key={item.id} value={item.value}>{item.value}</Select.Option>))}
            </Select>
        </Form.Item>

        <Form.Item
            label="Дата выхода"
            name="ReleasedId"
            rules={[{required: true, message: "Нельзя оставлять пустым"}]}
        >
            <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {releasedDates.map(item => (
                    <Select.Option key={item.id} value={item.value}>{item.value}</Select.Option>))}
            </Select>
        </Form.Item>

        <Form.Item
            label="Лейбл"
            name="LabelId"
            rules={[{required: true, message: "Нельзя оставлять пустым"}]}
        >
            <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {labels.map(item => (
                    <Select.Option key={item.id} value={item.value}>{item.value}</Select.Option>))}
            </Select>
        </Form.Item>

        <Form.Item
            label="Стиль"
            name="StyleId"
            rules={[{required: true, message: "Нельзя оставлять пустым"}]}
        >
            <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {styles.map(item => (
                    <Select.Option key={item.id} value={item.value}>{item.value}</Select.Option>))}
            </Select>
        </Form.Item>

        <Form.Item
            label="Исполнитель"
            name="ArtistId"
            rules={[{required: true, message: "Нельзя оставлять пустым"}]}
        >
            <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {artists.map(item => (
                    <Select.Option key={item.id} value={item.value}>{item.value}</Select.Option>))}
            </Select>
        </Form.Item>

        <Form.Item
            label="Тип альбома"
            name="TypeOfAlbumId"
            rules={[{required: true, message: "Нельзя оставлять пустым"}]}
        >
            <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {albumTypes.map(item => (
                    <Select.Option key={item.id} value={item.value}>{item.value}</Select.Option>))}
            </Select>
        </Form.Item>

        <Form.Item>
            <Button style={{float: "right"}} type="primary" htmlType="submit">
                Далее
            </Button>
        </Form.Item>
    </Form>;
}