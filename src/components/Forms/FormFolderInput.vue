<script setup lang="ts">
import { useField } from 'vee-validate'
import OpenFolderButton from '../OpenFolderButton.vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    placeholder: String,
    label: String
})

const { value, errorMessage } = useField<string>(() => props.name)

</script>

<template>
    <div>
        <div v-if="label" :for="name" class="label">
            <span class="label-text">{{ label }}</span>
        </div>

        <OpenFolderButton v-model="value" :id="name"/>

        <div v-if="errorMessage" class="label">
            <span class="label-text-alt text-error">{{ errorMessage }}</span>
        </div>
    </div>
</template>