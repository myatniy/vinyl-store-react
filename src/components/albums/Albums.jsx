import {useStoreon} from "storeon/react";
import {useEffect, useState} from "react";
import {Table} from "antd";
import {parseAlbumObject} from "../../utils";
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

export default function Albums() {
    const {
        albums,
        albumTypes,
        artists,
        countries,
        labels,
        releasedDates,
        styles
    } = useStoreon(
        "albums",
        "albumTypes",
        "artists",
        "countries",
        "formats",
        "genres",
        "labels",
        "releasedDates",
        "styles"
    );
    const [isLoading, setIsLoading] = useState(true)
    const [localAlbums, setLocalAlbums] = useState([]);

    useEffect(() => {
        if (
            albums !== undefined &&
            countries !== undefined &&
            releasedDates !== undefined &&
            labels !== undefined &&
            styles !== undefined &&
            artists !== undefined &&
            albumTypes !== undefined
        ) {
            const parsedData = albums.map(item => parseAlbumObject(item));
            setLocalAlbums(() => parsedData);
            setIsLoading(() => false);
        }
    }, [albums, countries, releasedDates, labels, styles, artists, albumTypes]);

    return <Table columns={columns} dataSource={localAlbums} loading={isLoading} pagination={false}/>;
}