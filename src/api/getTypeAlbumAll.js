import devAxios from "../devAxios";

export default async function getTypeAlbumAll() {
    const response = await devAxios.get("/typeAlbum");
    return response.data;
}