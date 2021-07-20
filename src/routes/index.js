import config from '@/config'
import { createWebHistory, createRouter } from "vue-router";
// import BlankPage from "@/pages/BlankPage.vue";
import NotFoundView from "@/components/NotFoundView.vue";
import modulesRoutes from "@/modules/modules.routes";
// modules component
// import MediaIndexPage from "@/modules/media/MediaIndexPage.vue";

const defaultRoutes = [
    {
        path: '/',
        redirect: {
            name: config.route.home
        }
    },
    {
        path: '/login',
        redirect: {
            name: config.route.login
        }
    },
    // {
    //     path: "/blank",
    //     name: "general:blank",
    //     component: BlankPage,
    // },
    {
        path: "/:catchAll(.*)",
        component: NotFoundView,
        name: "general:not-found",
    },
];

// merge route on modules
const routes = [
    ...defaultRoutes,
    ...modulesRoutes
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
