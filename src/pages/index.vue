<script setup lang="ts">
import { useSessionsStore } from '../stores/sessions';

import SectionTitle from '../components/SectionTitle.vue';
import SessionItem from '../components/SessionItem.vue';
import NewSessionModal from '../components/NewSessionModal.vue';
import { ref } from 'vue';

// const sessions = ref([
//   {
//     id: 1,
//     title: "Session 1",
//     date: new Date()
//   },
//   {
//     id: 2,
//     title: "Session 2",
//     date: new Date()
//   },
//   {
//     id: 3,
//     title: "Session 3",
//     date: new Date()
//   },
//   {
//     id: 4,
//     title: "Session 4",
//     date: new Date()
//   },
//   {
//     id: 5,
//     title: "Session 5",
//     date: new Date()
//   },
//   {
//     id: 6,
//     title: "Session 6",
//     date: new Date()
//   },
//   {
//     id: 7,
//     title: "Session 7",
//     date: new Date()
//   },
//   {
//     id: 8,
//     title: "Session 8",
//     date: new Date()
//   },
//   {
//     id: 9,
//     title: "Session 9",
//     date: new Date()
//   },
// ])

const { sessions } = useSessionsStore()

const isModalOpen = ref(false)
function openModal() {
    isModalOpen.value = true
}

</script>

<template>
    <div class="p-4">
        <SectionTitle>Sessions</SectionTitle>

        <div class="flex justify-center">
            <div v-if="sessions.size == 0" class="card bg-base-100 w-96 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">No sessions yet...</h2>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary" @click="openModal()">Create session</button>
                    </div>
                </div>
            </div>
            <div v-else class="flex flex-col w-full gap-4">
                <ul>
                    <li v-for="([_, session], index) in sessions">
                        <SessionItem :id="session.id" :name="session.name" :date="session.date" :path="session.path"
                            :is-odd="index % 2 != 0" />
                    </li>
                </ul>
                <button class="btn btn-success rounded-full w-1/5 mx-auto" @click="openModal()">
                    Create session
                </button>
            </div>

            <NewSessionModal v-model="isModalOpen" />
        </div>
    </div>
</template>