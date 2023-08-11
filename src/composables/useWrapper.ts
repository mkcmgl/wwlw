import { omit, pick } from 'lodash-es';
import {
    useAttrs,
} from 'vue';

export const useWrapper = (attrs = ['class', 'style', 'id']) => {

    const rawAttrs = useAttrs();

    const wrapperAttrs = pick(rawAttrs, attrs);

    const innerAttrs = omit(rawAttrs, attrs);

    return {
        wrapperAttrs,
        innerAttrs
    };
};