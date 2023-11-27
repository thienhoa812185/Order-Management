import axios from "axios";
const API_URL = "http://localhost:8080"

class LoginService {

    login(loginData) {
        return axios.post(API_URL + "/api/auth/login", loginData);
    }
}


const loginService = new LoginService();

export default loginService;
