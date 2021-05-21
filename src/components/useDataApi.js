import { useEffect, useState } from "react";
import axios from "../devAxios";

export default function useDataApi() {
    const [result, setResult] = useState([]);

    useEffect(() => {
        axios
            .get("/typeAlbum")
            .then(data => {
                console.log("***", data);
                setResult(oldArr => [...oldArr, "n"]);
            });
    }, []);

    return result;
}