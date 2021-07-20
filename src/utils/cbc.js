import config from "@/config";
import CryptoJS from "crypto-js";
import cbc from "@/utils/cbc"

export default {
    encrypt: function (s, key, iv) {
        const cipher = CryptoJS.AES.encrypt(s, CryptoJS.enc.Utf8.parse(key), {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });

        return cipher.toString();
    },
    decrypt: function (s, key, iv) {
        const cipher = CryptoJS.AES.decrypt(s, CryptoJS.enc.Utf8.parse(key), {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });

        const _str = cipher.toString(CryptoJS.enc.Utf8);

        return _str;
    },
    api: {
        encrypt: function (s) {
            return cbc.encrypt(s, config.api.cbcKey, config.api.cbcIv)
        },
        decrypt: function (s) {
            return cbc.decrypt(s, config.api.cbcKey, config.api.cbcIv)
        },
    },
    app: {
        encrypt: function (s) {
            return cbc.encrypt(s, config.app.cbcKey, config.app.cbcIv)
        },
        decrypt: function (s) {
            console.warn("cbc.app.decrypt");
            return cbc.decrypt(s, config.app.cbcKey, config.app.cbcIv)
        },
    }
}
