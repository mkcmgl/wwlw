<template>
    <component
		:is="tag"
		@click="writeToClipboard">
		<slot/>
		<i
			class="ml-2 mdi mdi-content-copy"
			v-if="icon"/>
	</component>
</template>

<script>

import { notify } from '~/plugins/notify';

export default {

    props: {
        content: {
            required: true,
        },
        tag: {
            required: false,
            type: String,
            default: 'button',
        },
        icon: {
            required: false,
            type: Boolean,
            default: false,
        },
    },

    methods: {
        writeToClipboard() {

            let input = document.createElement('textarea');
            input.value = this.content;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);

            notify({
                type: 'success',
                title: '已复制到剪切板',
            }); 
            
        },
    },
};
</script>
