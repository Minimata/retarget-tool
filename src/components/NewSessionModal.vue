<script setup lang="ts">
import { Form } from 'vee-validate';
import { ref } from 'vue';
import * as yup from 'yup';

import {
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription,
} from '@headlessui/vue'

import FormTextInput from './FormTextInput.vue';

const isOpen = defineModel({ default: false })

function setIsOpen(value: boolean) {
    isOpen.value = value
}

// const form = ref()
// const schema = yup.object({
//     name: yup.string().required(),
//     date: yup.date().required(),
//     folder: yup.string().required()
// })
// const formData = ref({
//     name: '',
//     date: '',
//     path: ''
// })

// const submit = (values: any) => {
//     // implement your logic here
//     console.log(values)
// }
// const reset = () => {
//     form.value.resetForm()
// }
</script>

<template>

    <Dialog :open="isOpen" @close="setIsOpen">
        <DialogPanel>
            <DialogTitle>Create new session</DialogTitle>
            <DialogDescription>
                Start a new mocap shooting here
            </DialogDescription>

            <!-- <Form ref="form" :validation-schema="schema" @submit="submit" :initial-values="formData">
                <FormTextInput placeholder="My latest session..." label="Session name" name="name" type="text" />
                <FormTextInput placeholder="22-07-2024" label="Session date" name="date" type="text" />
                <FormTextInput placeholder="D:/Path/To/Data" label="Session folder path" name="path" type="text" />

                <div class="">
                    <button class="btn btn-success" type="submit" @click="setIsOpen(false)">Submit</button>
                    <button @click="reset" class="btn btn-danger" type="button">Reset</button>
                    <button @click="setIsOpen(false)">Cancel</button>
                </div>
            </Form> -->

            <button>Deactivate</button>
        </DialogPanel>
    </Dialog>

    <!-- <div class="modal-box">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="text-lg font-bold">Create new session</h3>

    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form> -->
</template>