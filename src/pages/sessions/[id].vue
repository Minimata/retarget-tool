<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute('/sessions/[id]')

</script>

<template>
    <p class="text-xl">
        {{ route.params.id }}
    </p>
    <p class="text-xl">
        {{ route.query.title }}
    </p>
    <p class="text-xl">
        {{ new Date(route.query.date as string) }}
    </p>
</template>