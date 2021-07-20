const loginRules = {
    login: {
        username: {
            presence: {
                message: "username tidak boleh kosong",
                allowEmpty: false
            },
            // email: {
            //   message: "Silahkan isi email anda dengan benar"
            // }
        },
        password: {
            presence: {
                message: "password tidak boleh kosong",
                allowEmpty: false
            }
        },
    }
}

export default loginRules;
