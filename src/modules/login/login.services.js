import client from "@/utils/client"
import config from "@/config"


const loginServices = {
    token: (data) => {
        return client.post(config.api.authTokenUrl, data);
    }
}

export default loginServices;
