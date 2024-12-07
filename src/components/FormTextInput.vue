<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    type: String,
    placeholder: String,
    label: String
})

const { value, errorMessage, meta } = useField(() => props.name)
</script>

<template>
    <div>
        <div v-if="label" :for="name" class="label">
            <span class="label-text">{{ label }}</span>
        </div>
        <input :id="name" :class="{ field_error: errorMessage, valid: meta.valid }"
            class="input input-bordered w-full max-w-xs" v-model=" value" :placeholder="placeholder"
            :type="type || 'text'" />

        <div v-if="errorMessage" class="label">
            <span class="label-text-alt text-error">{{ errorMessage }}</span>
        </div>
    </div>
</template>