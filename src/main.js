import { createApp } from 'vue'
import App from './App.vue'

// import Antd from 'ant-design-vue';
import {
    Layout,
    LayoutSider,
    Menu,
    MenuItem,
    SubMenu,
    Breadcrumb,
    BreadcrumbItem,
    LayoutFooter,
} from "ant-design-vue";

import 'ant-design-vue/dist/antd.css';

const app = createApp(App)

// app.use(Antd)
app.use(Layout)
app.use(LayoutSider)
app.use(Menu)
app.use(MenuItem)
app.use(SubMenu)
app.use(Breadcrumb)
app.use(BreadcrumbItem)
app.use(LayoutFooter)

app.mount('#app')
