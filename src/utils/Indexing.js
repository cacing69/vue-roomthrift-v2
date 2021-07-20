import config from "@/config"
export default class Indexing {
    constructor() {
        this.state = {
            per_page: 2,
            last_id: null,
            filter:{}
        };

        this.actions = {
            history: [],
            filter: false,
            isFirstLoad: true,
            isOnRequest: false
        };

        this.iconFilter = "fa-chevron-down"

        this.rowEmptyText = config.app.txtLoadData;

        this.proto = {
            load: () => { }
        }

        this.data = {};
    }

    listen(e) {
        this.proto.load = e;
    }

    init() {
        this.fetch().then(() => {
            this.actions.history.push(null);
            this.actions.isFirstLoad = false;
        });
    }

    next() {
        if (!this.actions.isOnRequest) {
            this.actions.history.push(this.state.last_id);
            this.fetch();
        }
    }

    checkNext() {
        if (this.actions.isOnRequest) {
            return false;
        } else {
            if (this.actions.isFirstLoad) {
                return true;
            } else {
                if (this.state.last_id != null) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    checkPrev() {
        if (this.actions.isOnRequest) {
            return false;
        } else {
            if (this.actions.isFirstLoad) {
                return false;
            } else {
                if (this.actions.history[this.actions.history.length - 1] != null) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    prev() {
        if (!this.actions.isOnRequest) {
            this.actions.history.pop();
            const _tmpId = this.actions.history.pop();

            this.state.last_id = _tmpId;
            this.actions.history.push(_tmpId);

            this.fetch({ isPrev: true });
        }
    }

    done(e) {
        this.data = e.data.data;
        this.state.last_id = e.data.meta.last_id;
        this.actions.isFirstLoad = false;
        this.actions.isOnRequest = false;
    }

    fail() {
        this.actions.isFirstLoad = false;
        this.actions.isOnRequest = false;
    }

    toggleFilter() {
        this.actions.filter = !this.actions.filter;

        if (this.actions.filter) {
            this.iconFilter = "fa-chevron-up"
        } else {
            this.iconFilter = "fa-chevron-down"
        }
    }

    _checkRowEmptyText () {
        if (this.actions.isFirstLoad) {
            this.rowEmptyText = config.app.txtLoadData;
        } else {
            this.rowEmptyText = config.app.txtRowEmpty;
        }
    }

    _fetcher() {
        this.proto.load();
        this.checkNext();
        this.checkPrev();
        this._checkRowEmptyText();
    }


    async fetch(e) {
        if (!this.actions.isOnRequest) {
            if (this.actions.isFirstLoad) {
                this.actions.isOnRequest = true;
                this._fetcher();
            } else {
                if (e?.isPrev != undefined) {
                    if (e?.isPrev) {
                        this.actions.isOnRequest = true;
                        this._fetcher();
                    }
                } else {
                    if (this.state.last_id != null) {
                        this.actions.isOnRequest = true;
                        this._fetcher();
                    }
                }
            }
        }
    }

    filter(e) {
        this.state.last_id = null;
        this.actions.history = [];
        this._fetcher();
        this.actions.history.push(null);
    }

    reset(e) {
        this.state = {
            per_page: 2,
            last_id: null,
            filter: {}
        };

        this.actions = {
            history: [],
            filter: this.actions.filter,
            isFirstLoad: true,
        };

        this.data = {};

        this.init();
    }
}
