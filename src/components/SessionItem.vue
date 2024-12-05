<script setup lang="ts">
import { useRouter } from 'vue-router';

const { id, title, date, isOdd } = defineProps<{
    id: number,
    title: string,
    date: Date,
    isOdd: boolean
}>()

const router = useRouter()
function routeToSession() {
    router.push({ path: '/sessions/' + id, query: { title: title, date: date.toString() } })
}
</script>


<template>
    <div :class="['flex rounded-full w-full p-2 items-center gap-2', isOdd ? 'bg-base-300' : '']">

        <button class="btn btn-primary" @click="routeToSession">{{ title }}</button>
        <div class="badge badge-secondary">{{ date.toDateString() }}</div>
        <div class="grow"></div>
        <button class="btn btn-circle btn-outline btn-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>
</template>