<script lang="ts">
export default {
  id: "NotFound",
};
</script>

<template>
  <div class="container mx-auto mt-40 h-full items-center text-center">
    <h1
      class="mb-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-5xl font-extrabold text-transparent"
    >
      404
    </h1>
    <h2 class="mb-20 text-lg font-medium text-white">Ops, page not found</h2>
    <RouterLink
      class="rounded border-2 border-indigo-500 bg-pink-500/[0.05] py-2 px-4 font-bold text-indigo-500 hover:cursor-pointer hover:border-pink-500 hover:text-pink-500 disabled:cursor-not-allowed"
      to="/"
      >Go Home</RouterLink
    >
  </div>
</template>
