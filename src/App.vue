<script setup lang="ts">
import NavBar from "./components/Overalls/NavBar.vue";
import MainWrapper from "./components/Overalls/MainWrapper.vue";
import TopWrapper from "./components/Overalls/TopWrapper.vue";
</script>

<template>
  <TopWrapper>
    <NavBar />
    <MainWrapper>
      <RouterView />
    </MainWrapper>
  </TopWrapper>
</template>