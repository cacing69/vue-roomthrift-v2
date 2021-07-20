// import MediaIndexPage from "@modules/media/components/MediaIndexPage.vue";
import LoginIndexPage from "@/modules/login/components/LoginIndexPage.vue";

const loginRoutes = [
    {
        path: "/module/login",
        name: "module.login.index",
        component: LoginIndexPage,
        meta: {
            layout : "simple-app"
        }
    },
    // {
    //     path: "/modules/media/add",
    //     name: "modules:media:add",
    //     component: MediaFormPage,
    // },
    // {
    //     path: "/modules/media/:id/edit",
    //     name: "modules:media:edit",
    //     component: MediaFormPage,
    // },
];

export default loginRoutes;
