import store from 'store2'
import _config from '@/config'
import bloc from '@/bloc'
import routes from '@/routes'
// import UI from '@/codebase/ui'
import { sha256 } from 'js-sha256'
import cbc from '@/utils/cbc'
import qs from "qs";

import axios from "axios"

// let axios = require("axios")

// const _ui = new UI();

axios.defaults.baseURL = _config.api.baseUrl;

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['X-App-Key'] = _config.api.appKey;

axios.interceptors.request.use(function (config) {
	console.log(_config)
	// NProgress.start();
	const accessToken = store(_config.app.keyAccessToken);


	if (accessToken != null) {
		const _decryptToken = cbc.app.decrypt(accessToken);
		config.headers.common['Authorization'] = 'Bearer ' + _decryptToken;
	}

	const timestamp = bloc.get.timestamp()

	if (bloc.state.hash != undefined && bloc.state.hash != null && bloc.state.hash != "") {
		config.headers.common['X-Hash'] = cbc.app.decrypt(bloc.state.hash);
	}

	config.headers.common['X-Timestamp'] = timestamp;

	if (config.method.toLowerCase() == "post") {
		if (config.data != undefined) {
			let hash = sha256.hmac.create(_config.api.checksumKey)
			hash.update(JSON.stringify(config.data) + "|" + timestamp);

			config.headers.common['X-Checksum'] = hash.hex();
		}

	} else if (config.method.toLowerCase() == "get") {
		if (config.params != undefined) {
			config.paramsSerializer = params => {
				return qs.stringify(params)
			}
		}
	}

	return config;
}, function (error) {

	return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
	// NProgress.done();
	// _ui.unBlock();
	bloc.func.clearHash();

	return response;
}, function (error) {
	// _ui.errorProgress();
	// _ui.unBlock();

	if (error.response?.status == 401) {
		bloc.func.removeUser();
		bloc.func.removeToken();

		// _ui.notifyError(_config.app.msgUnauthorized);

		routes.replace({
			name: _config.route.login
		})
	} else if (
		error.response?.status == 500 ||
		error.response?.status == 404

	) {
		const _errorMessage = error.response?.data?.meta?.message;

		if (_errorMessage.toLowerCase() == "unexpected control character found") {
			bloc.func.removeToken();
		}

		// _ui.notifyError(_errorMessage);
	} else if (error.response?.status == 406) {
		// _ui.notifyError(`terjadi kesalahan (code:${error.response?.data?.meta?.message})`);
	}

	if (error.message === "Network Error") {
		// _ui.notifyError(`network error: tidak dapat terhubung ke Server`);
	}

	return Promise.reject(error);
});

let client = axios;

export default client;
