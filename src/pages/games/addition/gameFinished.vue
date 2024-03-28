<script setup lang="ts">
import perfectPng from "../../../assets/perfect.png";
import noPng from "../../../assets/no.png";

const { isCorrect, restart } = defineProps<{
  isCorrect: boolean | null
  restart: VoidFunction
}>();
</script>

<template>
  <div class="m-auto">
    <img :src="isCorrect ? perfectPng : noPng" class="w-64 h-auto"/>
    <button @click="restart">Restart</button>
  </div>
</template>

<style scoped>

</style>
