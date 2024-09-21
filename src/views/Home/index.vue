<template>
  <dv-full-screen-container class="full">
    <VScaleScreen width="1920" height="1080" :full-screen="true">
      <Header
        :title="'Menu Dashboard'"
        line-color="rgba(14,228,249, 1)"
        :center-style="{ color: '#0EE4F9', fontSize: '40px' }"
        :right-style="{ color: 'white' }"
      ></Header>
      <div class="menu">
        <div class="menu-links">
          <div v-for="link in links" :key="link.to" class="menu-link">
            <router-link :to="link.to" class="menu-link-item">{{ link.label }}</router-link>
          </div>
        </div>
      </div>
    </VScaleScreen>
  </dv-full-screen-container>
</template>

<script lang="ts" setup>
  import Header from '@/components/header/index.vue';
  import VScaleScreen from 'v-scale-screen';
  import { ref } from 'vue';

  const links = ref([
    { to: '/daily', label: 'DAILY OUTPUT' },
    { to: '/process', label: 'FULL DASHBOARD' },
  ]);
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }

  .menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
    padding: 10px;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100vh;
  }

  .menu-title {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: #333;
  }

  .menu-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 250px;
  }

  .menu-link {
    margin-bottom: 10px;
  }

  .menu-link-item {
    text-decoration: none;
    display: inline-block;
    border-block-end: solid;
    writing-mode: horizontal-tb;
    color: #0ee4f9;
    transition: transform 0.3s, color 0.3s;
    padding-right: 10px;
    font-size: 90px;
  }

  .menu-link-item:hover {
    transform: scale(1.1);
    color: rgb(250, 249, 249);
  }

  .language-select {
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .el-select {
    width: 300px;
  }

  .max-height {
    height: 100%;
  }

  .max-width {
    width: 100%;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
  }
</style>
