const config = {
    // baseUrl: "http://staging.api.capeon.bitstudio.id",
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    appKey: import.meta.env.VITE_API_KEY,
    checksumKey: import.meta.env.VITE_API_CHECKSUM_KEY,
    cbcKey: import.meta.env.VITE_API_CBC_KEY,
    cbcIv: import.meta.env.VITE_API_CBC_IV,
    authTokenUrl: "auth/token",
}

export default config;
