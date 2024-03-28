<script setup lang="ts">
import perfectPng from "../../../assets/perfect.png";
import noPng from "../../../assets/no.png";
// import { useSound } from '@vueuse/sound';

let difference: String

const { isCorrect, diff, restart } = defineProps<{
  isCorrect: boolean | null
  diff: number
  restart: VoidFunction
}>();

const checkDiff = () => {
  if (diff < 0) { //too many apples
    difference = "much"
  } else {
    difference = "little"
  }
}

checkDiff()
</script>

<template>
  <template v-if="!isCorrect">
    <div class="m-auto">
      <h3>That's too {{ difference }}, keep practicing!</h3>
      <img :src="noPng" class="w-64 h-auto"/>
      <button @click="restart">Restart</button>
    </div>
  </template>
  <template v-else>
    <div class="m-auto">
      <img :src="perfectPng" class="w-64 h-auto"/>
      <button @click="restart">Restart</button>
    </div>
  </template>
</template>

<style scoped>

</style>
