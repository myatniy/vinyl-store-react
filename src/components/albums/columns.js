import {Link} from "react-router-dom";

const columns = [
    {
        title: "Identifying Num",
        dataIndex: "identifyingNumber",
        key: "identifyingNumber",
        render: text => <Link to={`/album/${text}`}>{text}</Link>
    },
    {
        title: "Исполнитель",
        dataIndex: "artist",
        key: "artist",
    },
    {
        title: "Название",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Дата выхода",
        dataIndex: "releaseDate",
        key: "releaseDate",
    },
    {
        title: "Стиль",
        dataIndex: "style",
        key: "style",
    },
    {
        title: "Страна",
        dataIndex: "country",
        key: "country",
    },
    {
        title: "Тип альбома",
        dataIndex: "typeOfAlbum",
        key: "typeOfAlbum",
    },
    {
        title: "Лейбл",
        dataIndex: "label",
        key: "label",
    },
];

export default columns;