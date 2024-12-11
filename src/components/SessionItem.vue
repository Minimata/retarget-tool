<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useSessionsStore } from '../stores/sessions';

const { id, name, date, isOdd } = defineProps<{
    id: number,
    name: string,
    path: string,
    date: Date | undefined,
    isOdd: boolean
}>()
const { removeSession } = useSessionsStore()

const router = useRouter()
function routeToSession() {
    router.push({ path: '/sessions/' + id })
}
function deleteSession() {
    removeSession(id)
}
</script>


<template>
    <div :class="['flex rounded-full w-full p-2 items-center gap-2', !isOdd ? 'bg-base-300' : '']">
        <button class="btn btn-primary rounded-full" @click="routeToSession">{{ name }}</button>
        <span class="badge badge-secondary">{{ date ? date.toDateString() : "No date selected" }}</span>
        <span class="badge badge-accent text-sm italic">{{ path }}</span>
        <div class="grow"></div>
        <button class="btn btn-circle btn-outline btn-error" @click="deleteSession">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>
</template>