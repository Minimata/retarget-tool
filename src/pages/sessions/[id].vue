<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useSessionsStore } from '../../stores/sessions';

const { sessions } = useSessionsStore()
const route = useRoute('/sessions/[id]')
const possibleSession = sessions.get(+route.params.id)

const router = useRouter()
if (possibleSession === undefined) {
    router.push({ path: '/sessions/404'})
}

const session = possibleSession!

</script>

<template>
    <p class="text-xl">
        {{ session.id }}
    </p>
    <p class="text-xl">
        {{ session.name }}
    </p>
    <p class="text-xl">
        {{ session.date }}
    </p>
    <p class="text-xl">
        {{ session.path }}
    </p>
</template>