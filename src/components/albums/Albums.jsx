import {useStoreon} from "storeon/react";
import {useEffect, useState} from "react";
import {Table} from "antd";
import {parseAlbumObject} from "../../utils";
import columns from "./columns";

export default function Albums({localAlbums, setLocalAlbums}) {
    const {
        albums,
        albumTypes,
        artists,
        countries,
        labels,
        releasedDates,
        styles,
        users
    } = useStoreon(
        "albums",
        "albumTypes",
        "artists",
        "countries",
        "formats",
        "genres",
        "labels",
        "releasedDates",
        "styles",
        "users"
    );
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (
            albums !== undefined &&
            countries !== undefined &&
            releasedDates !== undefined &&
            labels !== undefined &&
            styles !== undefined &&
            artists !== undefined &&
            albumTypes !== undefined &&
            users !== undefined
        ) {
            const parsedData = albums.map(item => parseAlbumObject(item));
            setLocalAlbums(() => parsedData);
            setIsLoading(() => false);
        }
    }, [albums, countries, releasedDates, labels, styles, artists, albumTypes, setLocalAlbums, users]);

    return <Table columns={columns} dataSource={localAlbums} loading={isLoading} pagination={false}/>;
}