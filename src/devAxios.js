import axios from "axios";

const devAxios = axios.create({
    baseURL: "/api",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
    }
})

export default devAxios;