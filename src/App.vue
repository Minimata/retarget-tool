<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import MainWrapper from "./components/MainWrapper.vue";
import TopWrapper from "./components/TopWrapper.vue";
</script>

<template>
  <TopWrapper>
    <NavBar />
    <MainWrapper>
      <RouterView />
    </MainWrapper>
  </TopWrapper>
</template>