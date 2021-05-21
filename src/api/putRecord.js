import devAxios from "../devAxios";

export default async function putRecord(url, id, payload) {
    return await devAxios.put(`${url}/${id}`, payload);
}