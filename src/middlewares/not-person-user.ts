import {
    type RouteLocationNormalized
} from 'vue-router';

import {
    useAuthStore
} from '~/store/auth';

import {
    notify
} from '~/plugins/notify';

// 非个人用户

export const notPersonUser = async (
    to: RouteLocationNormalized,
    from,
    next
) => {

    await useAuthStore().refreshUser();

    if (
        !useAuthStore().isPersonUser
    ) {
        next();
    }
    else {

        notify({
            title: '无查看权限',
            type: 'warning'
        });

        next({
            name: 'index',
        });
    }
};

