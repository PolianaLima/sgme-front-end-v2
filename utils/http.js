import axios from "axios";

export const http = axios.create({
    baseURL: "https://sgme-deploy.onrender.com"
})