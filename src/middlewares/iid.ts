import {
    type RouteLocationNormalized
} from 'vue-router';

import {
    useAuthStore
} from '~/store/auth';

import {
    notify
} from '~/plugins/notify';

// 数字身份

export const iid = async (
    to: RouteLocationNormalized,
    from,
    next
) => {

    await useAuthStore().refreshUser();

    if (
        useAuthStore().hasIid
        || useAuthStore().isAdmin
    ) {
        next();
    }
    else {

        notify({
            title: '请先激活数字身份',
            type: 'warning'
        });

        next({
            name: 'digital-identities/activate',
        });
    }
};

