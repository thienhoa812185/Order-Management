import axios from "axios";
const API_URL = "http://localhost:8080"

class OrderOnlineService {

    getAllOrderOnline() {
        return axios.get(API_URL + "/api/order/onlineOrders");
    }

}

const orderOnlineService = new OrderOnlineService();

export default orderOnlineService;
