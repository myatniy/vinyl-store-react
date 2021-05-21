import devAxios from "../devAxios";

export default async function getRecords(url) {
    const response = await devAxios.get(url);
    return response.data;
}