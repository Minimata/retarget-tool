<script setup lang="ts">
const { title, date, isOdd } = defineProps<{
    title: string,
    date: Date,
    isOdd: boolean
}>()

let mainClass = "flex rounded-full w-full p-1 items-center gap-2"
if (isOdd) {
    mainClass += " bg-base-300"
}
</script>


<template>
    <div :class="mainClass">
        <button class="btn btn-primary">{{ title }}</button>
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