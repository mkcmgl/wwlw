import {
    type RouteLocationNormalized
} from 'vue-router';

import {
    useAuthStore
} from '~/store/auth';

import {
    notify
} from '~/plugins/notify';

// 实名认证

export const verified = async (
    to: RouteLocationNormalized,
    from,
    next
) => {

    await useAuthStore().refreshUser();

    if (
        useAuthStore().isVerified
        || useAuthStore().isAdmin
    ) {
        next();
    }
    else {

        notify({
            title: '请先完成实名认证',
            type: 'warning'
        });

        next({
            name: 'digital-identities/authentication',
        });
    }
};

