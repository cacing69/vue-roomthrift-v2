import client from "@/utils/client"

const general = {
    hash: (data) => {
        return client.get("hash", {
            params: data
        });
    },
    ping: (data) => {
        return client.get("ping", data);
    }
}

export default general;
