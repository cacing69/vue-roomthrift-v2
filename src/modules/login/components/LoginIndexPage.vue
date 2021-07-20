<template>
    <input v-model="form.username" type="text"><br>
    <input v-model="form.password" type="password"><br>
    <button @click="login()">login</button>
</template>

<script>
import loginRules from "@/modules/login/login.rules";
import loginServices from "@/modules/login/login.services";
import validate from "validate.js";
import cbc from "@/utils/cbc"

export default {
  data() {
    return {
      form: {
        username: "developer@email.com",
        password: "password^",
      },
      errors: {
        validate: null,
      },
    };
  },
  mounted() {
    // this.ui.init();
    this.bloc.func.reloadUser();

    if (this.bloc.state.user != null) {
      if(this.bloc.get.miniSessionOnStorage()) {
        this.bloc.func.removeUser();
        this.$router.replace({
          name: this.config.route.home,
        });
      }
    }
  },
  inject: ["config", "bloc"],
  methods: {
    buildForm(){
      return {
        username : this.form.username,
        password : cbc.api.encrypt(this.form.password),
      };
    },
    login() {
      this.errors.validate = null;

      const errors = validate(this.form, loginRules.login, { fullMessages: false });

      if (errors) {
        this.errors.validate = errors;
        return;
      }

    //   this.ui.block();

      this.bloc.func
        .hash(this.config.api.authTokenUrl)
        .then(() => {
          loginServices
            .token(this.buildForm())
            .then((res) => {
              this.bloc.set.accessToken(res.data.data.auth_token);

              // request detail user
              let user = {
                name: "Ibnul Mutaki",
                username: "cacing69",
                avatar: "/media/avatars/avatar15.jpg",
              };

              this.bloc.set.user(user);

            //   this.ui.notifySuccess(this.config.app.msgLoginSuccess);
            //   this.ui.unBlock();

              this.$router.replace({
                name: this.config.route.home,
              });
            })
            .catch((err) => {
            //   this.ui.unBlock();
            });
        });
    },
  },
};
</script>
