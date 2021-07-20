import { reactive, readonly } from 'vue'
import store from 'store2'
import config from '@/config'
import cbc from '@/utils/cbc'
import generalServices from '@/modules/general/general.services'

const state = reactive({
	user: null,
	onLine: false,
	hash: null,
})

const set = {
	user(data) {
		state.user = data;
		store(config.app.keyCurrentUser, data);
	},
	accessToken(token) {
		store(config.app.keyAccessToken, cbc.app.encrypt(token));
	},
	onLine(_state) {
		state.onLine = _state;
	},
	hashUrl(_url) {
		state.hash.url = _url;
	},
}

const func = {
	reloadUser() {
		state.user = store(config.app.keyCurrentUser);
	},
	removeUser() {
		state.user = null;
		store.remove(config.app.keyCurrentUser);
	},
	removeToken() {
		state.user = null;
		store.remove(config.app.keyAccessToken);
	},
	logout() {
		store.clearAll();
	},
	reloadUser() {
		state.user = store(config.app.keyCurrentUser);
	},
	hash(_url) {
		return new Promise((resolve, rejec) => {
			generalServices.hash({ url: _url })
				.then((res) => {
					state.hash = cbc.app.encrypt(res.data?.data?.hash);

					resolve(state.hash)
				})
		})
	},
	clearHash() {
		state.hash = null;
	},
}

const get = {
	userOnStorage() {
		return store.has(config.app.keyCurrentUser);
	},
	miniSessionOnStorage() {
		return store.has(config.app.keyAccessToken);
	},
	timestamp() {
		return parseInt(Date.now().toString().substr(0, 10));
	}
}

export default {
	state: readonly(state),
	set,
	func,
	get
}
