<script setup lang="ts">
defineProps<{ dataTarget: string; initialValue: string }>();
</script>

<template>
  <div
    class="flex w-full flex-col items-center rounded-base border-2 border-border bg-green-400 p-4 text-black shadow-light"
  >
    <h3 class="mb-2 text-2xl font-bold">Vue</h3>
    <p data-value :data-target="dataTarget" class="mb-4 text-8xl font-bold">
      {{ initialValue }}
    </p>
  </div>
</template>
