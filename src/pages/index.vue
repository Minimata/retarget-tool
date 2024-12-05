<script setup lang="ts">
import { ref } from 'vue'

import SectionTitle from '../components/SectionTitle.vue';
import SessionItem from '../components/SessionItem.vue';

const sessions = ref([
  {
    title: "Session 1",
    date: new Date()
  },
  {
    title: "Session 2",
    date: new Date()
  },
  {
    title: "Session 3",
    date: new Date()
  },
  {
    title: "Session 4",
    date: new Date()
  },
  {
    title: "Session 5",
    date: new Date()
  },
  {
    title: "Session 6",
    date: new Date()
  },
  {
    title: "Session 7",
    date: new Date()
  },
  {
    title: "Session 8",
    date: new Date()
  },
  {
    title: "Session 9",
    date: new Date()
  },
])


</script>

<template>
  <div class="p-4">
    <SectionTitle>Sessions</SectionTitle>

    <div class="flex justify-center">
      <div v-if="sessions.length == 0" class="card bg-base-100 w-96 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">No sessions yet...</h2>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Create session</button>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col w-full gap-4">
        <ul>
          <li v-for="(session, index) in sessions">
            <SessionItem :title="session.title" :date="session.date" :is-odd="index % 2 != 0"/>
          </li>
        </ul>
        <button class="btn btn-success rounded-full w-1/5 mx-auto">Create session</button>
      </div>
    </div>
  </div>
</template>