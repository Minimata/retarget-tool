<script setup lang="ts">
import { useField } from 'vee-validate'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    label: String
})

const { value, errorMessage, meta } = useField(() => props.name)
</script>

<template>
    <div>
        <div v-if="label" :for="name"
            class="label">
            <span class="label-text">{{ label }}</span>
        </div>

        <VueDatePicker :teleport="true" dark :state="meta.valid" v-model="value as Date">
        </VueDatePicker>

        <div v-if="errorMessage" class="label">
            <span class="label-text-alt text-error">{{ errorMessage }}</span>
        </div>
    </div>
</template>

<style lang="css">
.dp__theme_dark {
    --dp-background-color: var(--fallback-b1, oklch(var(--b1)/var(--tw-bg-opacity, 1)));
    --dp-text-color: var(--fallback-bc, oklch(var(--bc)/var(--tw-bg-opacity, 1)));
    --dp-hover-color: #484848;
    --dp-hover-text-color: #fff;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: var(--fallback-p, oklch(var(--p)/var(--tw-bg-opacity, 1)));
    --dp-primary-disabled-color: #61a8ea;
    --dp-primary-text-color: #fff;
    --dp-secondary-color: var(--fallback-n, oklch(var(--n)/var(--tw-bg-opacity, 1)));
    --dp-border-color: #2d2d2d;
    --dp-menu-border-color: #2d2d2d;
    --dp-border-color-hover: #aaaeb7;
    --dp-border-color-focus: #aaaeb7;
    --dp-disabled-color: #737373;
    --dp-disabled-color-text: #d0d0d0;
    --dp-scroll-bar-background: #212121;
    --dp-scroll-bar-color: #484848;
    --dp-success-color: var(--fallback-su, oklch(var(--su)/var(--tw-bg-opacity, 1)));
    --dp-success-color-disabled: #428f59;
    --dp-icon-color: #959595;
    --dp-danger-color: var(--fallback-er, oklch(var(--er)/var(--tw-bg-opacity, 1)));
    --dp-marker-color: var(--fallback-er, oklch(var(--er)/var(--tw-bg-opacity, 1)));
    --dp-tooltip-color: #3e3e3e;
    --dp-highlight-color: rgb(0 92 178 / 20%);
    --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
    --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
    --dp-range-between-border-color: var(--dp-hover-color, #fff);
}
</style>