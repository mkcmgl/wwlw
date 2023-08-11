import {
    type UserConfig,
    defineConfig,
    loadEnv
} from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

export default (
    { mode }: { mode: string }
) => {

    process.env = {
        ...process.env,
        ...loadEnv(mode, process.cwd())
    };

    return defineConfig({

        base: process.env.VITE_APP_BASE,
	
        resolve: {
            alias: {
                '~': path.resolve(__dirname, './src'),
            },
        },

        // for those who develop in a virtual machine
        server: {
            host: '0.0.0.0',
            port: process.env.VITE_APP_PORT || 5173,
            strictPort: true,
            watch: {
                usePolling: true,
            },
            hmr: {
                host: process.env.VITE_APP_HOST || 'iot.inspur.test',
                port: process.env.VITE_APP_PORT || 5173,
            },
        },

        plugins: [
            vue(),
        ],

    } as UserConfig);
};