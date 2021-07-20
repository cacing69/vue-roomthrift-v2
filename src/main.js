import { createApp } from 'vue'
import App from './App.vue'
import routes from '@/routes';

// import Antd from 'ant-design-vue';
import {
    Breadcrumb,
    BreadcrumbItem,
    Layout,
    LayoutFooter,
    LayoutSider,
    Menu,
    MenuItem,
    Row,
    SubMenu,
} from "ant-design-vue";

import 'ant-design-vue/dist/antd.css';

const app = createApp(App)

// app.use(Antd)
app.use(Breadcrumb)
app.use(BreadcrumbItem)
app.use(Layout)
app.use(LayoutSider)
app.use(LayoutFooter)
app.use(Menu)
app.use(MenuItem)
app.use(Row)
app.use(SubMenu)

app.use(routes)

app.mount('#app')
