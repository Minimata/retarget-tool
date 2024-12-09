<script setup lang="ts">
const folder = defineModel<string>()
const { isValid = true } = defineProps<{ isValid?: boolean }>()

function selectFolder() {
    console.log("toto");
}
</script>

<template>
    <button
        :class="['btn btn-primary w-full', isValid ? 'btn-error' : '']"
        @click="selectFolder">Select a folder</button>
</template>