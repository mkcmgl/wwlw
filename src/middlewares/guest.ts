import {
    type RouteLocationNormalized
} from 'vue-router';

import {
    useAuthStore
} from '~/store/auth';

export const guest = async (
    to: RouteLocationNormalized,
    from,
    next
) => {

    await useAuthStore().refreshUser();

    if (!useAuthStore().isAuthed) {
        next();
    }
    else {
        next({
            name: 'index',
        });
    }
};

