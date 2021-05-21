import devAxios from "../devAxios";

export default async function deleteRecord(url, id) {
    return await devAxios.delete(`${url}/${id}`);
}