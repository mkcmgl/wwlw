import axios from 'axios';
import { notify } from './notify';
import { useAuthStore } from '~/store/auth';
import router from '~/router';

import { ExtendImportMeta } from '~/types.d';

axios.defaults.baseURL = (import.meta as ExtendImportMeta).env.VITE_API_URL;

axios.interceptors.request.use(
    config => {

        const authStore = useAuthStore();

        if (
            authStore.token
        ) {
            config.headers.Authorization = `Bearer ${authStore.token}`;
        }

        config.headers['tenant-id'] = 1;

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {

        const data = response.data;

        if (
            data instanceof Blob
        ) {
            return response;
        }
        else if (
            // 这个框架返回的状态码完全没有按照 HTTP response status code 规范来
            // 这里的判断只是测试过程中遇到的，实际上有些错误可能没有考虑到
            data.code.toString().startsWith('4')
            || data.code.toString().startsWith('5')
            || data.code.toString().startsWith('100')
        ) {

            notify({
                title: 'Error',
                text: data.msg,
                type: 'error',
            });

            if (data.code == 401) {
                useAuthStore().clearAuth();

                router.push({
                    name: 'login',
                });
            }

            return Promise.reject(data);
        }

        return response;
    },
    error => {

        notify({
            title: 'Error',
            text: error.message,
            type: 'error',
        });

        return Promise.reject(error);
    }
);

export default axios;