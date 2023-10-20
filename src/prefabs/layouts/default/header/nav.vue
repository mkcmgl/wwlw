<template>
    <nav
        class="
            pr-4 -mx-1
        ">
        <router-link
            v-for="({ to, label }, index) in [
                {
                    label: '数字身份',
                    to: {
                        name: 'digital-identities'
                    }
                },
                {
                    label: '区块链网关',
                    to: {
                        name: 'gateways'
                    }
                },
                {
                    label: '区块链数据归档',
                    to: {
                        name: 'archives'
                    }
                },
            ]"
            :key="index"
            :to="to"
            active-class="enable-clickable enable-hoverable font-bold"
            class="
                p-2 rounded clickable hoverable relative
                mx-1
                cursor-pointer select-none
                text-sm
                text-white
            "
            v-wave>
            <i
                class="
                    opacity-50 mr-1
                ">•</i> {{ label }}
        </router-link>
    </nav>
</template>