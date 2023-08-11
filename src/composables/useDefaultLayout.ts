import DefaultLayoutSidebar from '~/prefabs/layouts/default/sidebar.vue';
import DefaultLayoutContent from '~/prefabs/layouts/default/content.vue';

import { useMeta } from	'vue-meta';

export const useDefaultLayout = (titleTemplate = '') => {

    useMeta({
        titleTemplate: `%s - ${titleTemplate}`
    });

    return {
        DefaultLayoutSidebar,
        DefaultLayoutContent
    };
};