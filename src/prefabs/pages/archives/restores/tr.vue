<template>
    <tr>
        <td>
            {{ restore.backupId }}
        </td>
        <td>
            {{ restore.nodeId }}
        </td>
        <td>
            {{ RestoreStatus[restore.status] }}
        </td>
        <td>
            {{ restore.id }}
        </td>
        <td>
            {{ restore.createTime }}
        </td>
    </tr>
</template>

<script lang="ts" setup>

import { Restore, RestoreStatus } from '~/types/archive/restore';

defineProps<{
    restore: Restore
}>();

</script>