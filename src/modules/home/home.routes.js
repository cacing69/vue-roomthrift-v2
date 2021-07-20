// import MediaIndexPage from "@modules/media/components/MediaIndexPage.vue";
import HomeIndexPage from "@/modules/home/components/HomeIndexPage.vue";

const HomeRoutes = [
    {
        path: "/module/home",
        name: "module.home.index",
        component: HomeIndexPage,
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

export default HomeRoutes;
