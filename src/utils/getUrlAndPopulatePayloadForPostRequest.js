export default function getUrlAndPopulatePayloadForPostRequest(keyMap, payloadValues) {
    if (keyMap === "1")
        return  {
            url: "/artist",
            payload: {
                "Name": payloadValues[0]
            }
        };
    if (keyMap === "2")
        return  "/country";
    if (keyMap === "3")
        return  "/format";
    if (keyMap === "4")
        return  "/label";
    if (keyMap === "5")
        return  "/artist";
    if (keyMap === "6")
        return  "/released";
    if (keyMap === "7")
        return  "/style";
    if (keyMap === "8")
        return  "/tracklist";
    if (keyMap === "9")
        return  "/typeAlbum";
}