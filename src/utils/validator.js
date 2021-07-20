import config from "@/config";
import helper from "@/config/helper";

export default {
    create: function(validator) {
        let _holder = {};

        let _this = this;

        Object.keys(validator).forEach(function (key) {
            _holder[key] = {};
            validator[key].rules.forEach((e) => {
                const _type = _this.getType(e);

                // console.log(_type)

                if (_type === "required" || _type === "email") {
                    if (_type === "required") {
                        _holder[key]["presence"] = {}
                        _holder[key]["presence"]["message"] = _this.buildMessage(e, key, validator[key]?.meta);
                        _holder[key]["presence"]["allowEmpty"] = false;
                    } else if (_type === "email") {

                    }
                } else if (_type == "min" || _type == "max") {
                    if (_type == "min") {
                        const _min = e.replace("min:", "");
                        if (_holder[key]?.length == undefined) {
                            _holder[key]["length"] = {}
                        }

                        _holder[key]["length"]["minimum"] = parseInt(_min);
                        _holder[key]["length"]["tooShort"] = _this.buildMessage(e, key, validator[key]?.meta);
                    } else if (_type == "max"){

                        const _max = e.replace("max:", "");

                        if (_holder[key]?.length == undefined) {
                            _holder[key]["length"] = {}
                        }

                        _holder[key]["length"]["maximum"] = parseInt(_max);
                        _holder[key]["length"]["tooLong"] = _this.buildMessage(e, key, validator[key]?.meta);
                    }
                }
            })
        });
        return _holder;
    },
    buildMessage: function (e, key, meta) {
        return this.getElement(e, key, meta);
    },
    getElement: function (e, key, meta) {
        let _element = e.split(":");

        const _type = _element[0].toLowerCase();

        if (_type == "min" || _type == "max") {
            return config.validator[_type].replace(":key", this.getKeyOnMessage(key, meta)).replace(":value", _element[1]);
        } else if (_type == "required" || _type == "email") {
            return config.validator[_type].replace(":key", this.getKeyOnMessage(key, meta));
        } else {
            return "Validasi gagal";
        }
    },
    getKeyOnMessage: function (key, meta) {
        if (meta?.name != undefined) {
            return meta.name;
        } else {
            return helper.capitalize(key);
        }
    },
    getType: function (_el) {
        let _element = _el.split(":");
        const _type = _element[0].toLowerCase();

        return _type;
    }
}
