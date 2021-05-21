import { useEffect, useState } from "react";
import getTypeAlbumsAll from "../api";

export function useAlbumTypes() {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(oldArr => [...oldArr, () => getTypeAlbumsAll()]);
    }, []);

    return data;
}