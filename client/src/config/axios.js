import Axios from "axios";
import { env } from "./globals";

export const axios = Axios.create({
    baseURL: env.SERVER_URL,
    timeout: 30000
})