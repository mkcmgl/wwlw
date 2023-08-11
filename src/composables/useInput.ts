import {
    defineProps,
    defineEmits,
    computed,
    inject,
    onMounted,
    onUnmounted,
} from 'vue';

import {
    type Value,
    type Rule,
    type CustomErrorMessages,
    validate as validateHelper,
} from '~/utils/validate';

export const generateUuid = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: number) =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
};

export type InputProps = {
    modelValue: Value;
    rules: Rule[];
    attr?: string;
    placeholder?: string;
    error?: string;
    tip?: string;
    preventRegister?: boolean;
    messages?: CustomErrorMessages;
    resetValue?: Value;
};

export const useInput = (
    props: ReturnType<typeof defineProps> & InputProps,
    emits: ReturnType<typeof defineEmits>
) => {

    const id = generateUuid();

    const computedValue = computed({
        get() {
            return props.modelValue;
        },
        set(value) {
            emits('update:modelValue', value);
        }
    });

    const hasError = computed(() => {
        return !!props.error;
    });

    const hasTip = computed(() => {
        return !!props.tip;
    });

    const clearError = () => {
        emits('update:error', '');
    };

    const clearValue = () => {

        computedValue.value = props.resetValue || '';
    };

    const refresh = () => {
        clearError();
        clearValue();
    };

    const validate = (
        e: {
            target: {
                value: Value
            };
        }
    ) => {

        const {
            isValid, error
        } = validateHelper(
            e.target.value || computedValue.value,
            props.rules,
            props.messages
        );

        if (!isValid) {
            emits(
                'update:error',
                error?.replace(':attr', props?.attr || props?.placeholder || '')
            );
        }
        else {
            clearError();
        }

        return isValid;
    };

    const manualValidate = () => {
        return validate({
            target: {
                value: computedValue.value
            }
        });
    };

    const registerColumn = inject(
        'registerColumn',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (_: string, __: () => boolean, ___: () => void) => () => { }
    );

    onMounted(() => {
        if (!props.preventRegister) {
            registerColumn(id, manualValidate, refresh);
        }
    });

    const destroyColumn = inject(
        'destroyColumn',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (_: string) => () => { }
    );

    onUnmounted(() => {
        if (!props.preventRegister) {
            destroyColumn(id);
        }
    });

    return {
        id,
        computedValue,
        registerColumn,
        destroyColumn,
        validate,
        refresh,
        clearError,
        clearValue,
        hasError,
        hasTip,
    };
};