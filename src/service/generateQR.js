import axios from "axios";
const API_URL = "http://localhost:8080"

class GenerateQRService {

    generate(urlWeb, IdTable) {
        return axios.get(API_URL + `/api/QRCode/genrateQRCode/${urlWeb}/${IdTable}/350/350`,
            {
                responseType: 'arraybuffer',
            });
    }

}

const generateQRService = new GenerateQRService();

export default generateQRService;
