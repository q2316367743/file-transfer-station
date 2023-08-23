import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './plugin/router';
import {runner} from "@/plugin/runner";

import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';

utools.onPluginEnter(action => {
    console.log(action)
    if (action.code === 'application') {
        runner();
    }
})

// 额外引入图标库
createApp(App)
    .use(ArcoVue)
    .use(ArcoVueIcon)
    .use(createPinia())
    .use(router)
    .mount('#app');
