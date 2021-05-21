import devAxios from "../devAxios";

export default async function postRecord(url, payload) {
    return await devAxios.post(url, payload);
}