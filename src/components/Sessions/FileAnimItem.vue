<script setup lang="ts">
import { DirEntry } from '@tauri-apps/plugin-fs';
import { Filetype } from '../../interfaces/filesystem.ts';

const { file, folder, type, isOdd } = defineProps<{
    file: DirEntry,
    folder: DirEntry,
    type: Filetype,
    isOdd: boolean
}>()
</script>
<template>
    <div :class="['relative rounded-md p-3 hover:bg-base-300', !isOdd ? 'bg-base-200' : '']">
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
            'ring-primary focus:z-10 focus:outline-none focus:ring-2',
        ]" @click="$emit('clickedOn', file, folder, type)"/>
    </div>
</template>