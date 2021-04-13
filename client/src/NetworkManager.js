import axios from "axios";
import { config } from "dotenv";
config() 

export default class NetworkManager {
    static createManager() {
        let token = localStorage.getItem('token')
        if(token)
            axios.defaults.headers = {'x-auth-token': token}
            return axios.create({
                baseURL: process.env.API_URL,
            })
    }}