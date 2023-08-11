import '~/assets/index.scss';
import '@mdi/font/css/materialdesignicons.min.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createMetaManager } from 'vue-meta';
import VWave from 'v-wave';
import Notifications from '@kyvg/vue3-notification';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'

import '~/extends';
import App from '~/App.vue';
import router from '~/router';

createApp(App)
    .use(VWave, {
        color: 'currentColor'
    })
    .use(Notifications)
    .use(createMetaManager())
    .use(createPinia())
    .use(router)
    .use(ElementPlus)
    .mount('#app');

