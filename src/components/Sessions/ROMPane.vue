<script setup lang="ts">
import { SessionFileInput } from '../../interfaces/sessionFileInput'
import { readDir } from '@tauri-apps/plugin-fs';

const { session, file } = defineProps<SessionFileInput>()
</script>

<template>
    <h2 class="text-xl">Hello from ROM view ! Selected {{ file }}</h2>
</template>