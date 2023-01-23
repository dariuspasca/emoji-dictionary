<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header class="bg-zinc-900">
    <div class="container mx-auto">
      <nav class="flex justify-between text-gray-100 py-4">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
