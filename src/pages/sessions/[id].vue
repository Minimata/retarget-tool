<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useSessionsStore } from '../../stores/sessions';

import SessionMain from '../../components/SessionMain.vue';
import { Session } from '../../interfaces/session';

const { sessions } = useSessionsStore()
const route = useRoute('/sessions/[id]')
const possibleSession = sessions.get(+route.params.id)

const router = useRouter()
if (possibleSession === undefined) {
    router.push({ path: '/sessions/404'})
}

const session = possibleSession! as Session
</script>

<template>
    <Suspense>
        <SessionMain :session="session" />

        <template #fallback>
            <p class="text-xl">
                Loading {{ session.name }} at {{ session.path }}...
            </p>
        </template>
    </Suspense>
</template>