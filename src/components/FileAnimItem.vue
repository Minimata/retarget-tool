<script setup lang="ts">
import { DirEntry } from '@tauri-apps/plugin-fs';

const { file, isOdd } = defineProps<{
    file: DirEntry,
    isOdd: boolean
}>()
</script>
<template>
    <div :class="['relative rounded-md p-3 hover:bg-gray-100', !isOdd ? 'bg-base-300' : '']">
        <h3 class="text-sm font-medium leading-5">
            {{ file.name }}
        </h3>

        <ul class="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
            <li>is it a file ?</li>
            <li>&middot;</li>
            <li>{{ file.isFile ? 'Yes' : 'No' }}</li>
        </ul>

        <a href="#" :class="[
            'absolute inset-0 rounded-md',
            'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2',
        ]" />
    </div>
</template>