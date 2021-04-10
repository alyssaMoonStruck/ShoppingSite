import axios from "axios";
import { config } from "dotenv";
config() 

export default class NetworkManager {
    static createManager() {
        let token = this.getToken()
        if(token)
            axios.defaults.headers = {Authorization: 'Bearer' + token}
            return axios.create({
                baseURL: process.env.API_URL,
            })
    }
    static getToken() {
        return "";
    }
}