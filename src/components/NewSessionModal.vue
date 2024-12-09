<script setup lang="ts">
import { ref } from 'vue';

import { Form } from 'vee-validate';
import * as yup from 'yup'; 

import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'

import FormTextInput from './FormTextInput.vue';
import FormDateInput from './FormDateInput.vue';
import FormFolderInput from './FormFolderInput.vue';

const isOpen = defineModel<boolean>()

function setIsOpen(value: boolean) {
    isOpen.value = value
}

const form = ref()
const schema = yup.object({
    name: yup.string().required(),
    date: yup.date().required(),
    path: yup.string().required()
})
const formData = ref({
    name: '',
    date: '',
    path: ''
})

const submit = (values: any) => {
    // implement your logic here
    console.log(values)
}

function closeModal() {
    isOpen.value = false
}

</script>

<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">

                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all modal-box">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 ">
                                Create new session
                            </DialogTitle>

                            <Form ref="form" :validation-schema="schema" @submit="submit" :initial-values="formData">
                                <FormTextInput placeholder="Session name..." label="Session name" name="name" />
                                <FormDateInput label="Session date" name="date" />
                                <FormFolderInput placeholder="D:/Path/To/Data" label="Session folder path" name="path"
                                    type="text" />

                                <div class="pt-4 flex justify-end gap-2">
                                    <button class="btn btn-success" type="submit" @click="closeModal">Submit</button>
                                    <button class="btn btn-danger" @click="closeModal">Cancel</button>
                                </div>
                            </Form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    <!-- <div class="my-modal-box">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="text-lg font-bold">Create new session</h3>

    </div>
    <form method="dialog" class="my-modal-backdrop">
        <button>close</button>
    </form> -->
</template>
