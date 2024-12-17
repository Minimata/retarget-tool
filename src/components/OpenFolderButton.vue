<script setup lang="ts">
import { open } from '@tauri-apps/plugin-dialog';

const folder = defineModel<string>()

async function selectFolder() {
    const file = await open({
        multiple: false,
        directory: true,
        recursive: true
    });
    folder.value = file!
}
</script>

<template>
    <button
        :class="['btn btn-primary w-full', folder ? 'btn-success' : 'btn-error']"
        @click="selectFolder">{{ folder ? folder : "Select a folder" }} </button>
</template>