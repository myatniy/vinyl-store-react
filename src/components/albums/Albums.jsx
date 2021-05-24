import {useStoreon} from "storeon/react";
import {useEffect, useState} from "react";
import {Table} from "antd";
import {parseAlbumObject} from "../../utils";
import columns from "./columns";

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