<template>
  <component :is="layout" />
</template>
<script>
import { readonly } from "vue";
import BackendApp from "@/layouts/BackendApp.vue";
import SimpleApp from "@/layouts/SimpleApp.vue";
import bloc from "@/bloc";
import config from "@/config";

export default {
  name: "app",
  components: {
    "backend-app": BackendApp,
    "simple-app": SimpleApp,
  },
  provide: {
    config: readonly(config),
    bloc: bloc,
  },
  methods: {
    redirectToLogin() {
      bloc.func.removeUser();

      this.$router.replace({
        name: config.route.login,
      });
    },
    checkAuthState() {
      if (bloc.state.user == null) {
        this.redirectToLogin();
      } else {
        if (!bloc.get.miniSessionOnStorage()) {
          this.redirectToLogin();
        }
      }
    },
    updateOnlineStatus(e) {
      const { type } = e;
      bloc.set.onLine(type === "online");

      if (type != "online") {
        // const _ui = new UI();
        // _ui.notifyError(config.app.msgOffline);
      }
    },
  },
  data() {
    return {
      layout: null,
    };
  },
  mounted() {
    bloc.set.onLine(navigator.onLine);

    bloc.func.reloadUser();
    this.checkAuthState();

    // handling online, offline state
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
  },
  beforeDestroy() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
  },
  watch: {
    $route(to) {
      // const $pc = $("#page-container");
      // if ($pc.hasClass("sidebar-o-xs")) {
      //   $pc.removeClass("sidebar-o-xs");
      // }

      if (to.meta.layout !== undefined) {
        this.layout = to.meta.layout;
      } else {
        this.layout = "backend-app";
      }

      if (to.name != config.route.login) {
        this.checkAuthState();
      }
    },
  },
};
</script>
