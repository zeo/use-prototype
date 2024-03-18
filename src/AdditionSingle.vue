<script setup lang="ts">

import {onMounted, ref, watchEffect} from "vue";
import SingleAddMidgame from "./SingleAddMidgame.vue";

const playerGivenPile1 = ref(0)
const playerGivenPile2 = ref(0)
const playerReady = ref(false)

const requiredSum = ref(0)
const given = ref(0)

const solved = ref(false)
const pile1 = ref(0)
const pile2 = ref(0)

const setupGame = () => {
  requiredSum.value = 2 + Math.floor(Math.random() * 8)
  pile1.value = Math.floor(requiredSum.value / 2) + Math.floor(Math.random() * Math.floor(requiredSum.value / 2))
  pile2.value = requiredSum.value - pile1.value + Math.floor(Math.random() * Math.floor(requiredSum.value))

  given.value = 0
  solved.value = false

  player.value = requiredSum.value + Math.ceil(Math.random() * 3)
  playerGiven.value = 0
  playerReady.value = false
}

onMounted(setupGame);

const playerPress = () => {
  playerReady.value = false
  player.value--;
  playerGiven.value++
  given.value++;
};

const playerRemove = () => {
  playerReady.value = false
  player.value++;
  playerGiven.value--;
  given.value--;
}

watchEffect(() => {
  if (playerReady.value) {
    solved.value = true
  }
})

</script>

<template>
  <div style="min-height: 100vh; display: flex; flex-direction: column;">
    <div class="screen1 screen" style="border-bottom: 2px solid;">
      <template v-if="!solved">
        <h1 style="text-align: center; margin-top: 64px;">Count to {{ requiredSum }} apples!</h1>

        <div style="display: flex; justify-content: center; margin-top: 32px;">
          <button v-for="_ in player" style="margin-right: 8px; background: none; border: none;" @click="playerPress">
            <img style="width: 64px; height: 64px;" src="https://pngfre.com/wp-content/uploads/apple-95-270x300.png">
          </button>
        </div>

        <div style="display: flex; justify-content: center;">
          <img style="width: 128px; height: 128px;" src="https://png.pngtree.com/png-vector/20230318/ourmid/pngtree-cow-animal-standing-transparent-on-white-background-png-image_6656233.png"/>
        </div>

        <div style="display: flex; justify-content: center;">
          <img style="width: 64px; height: 64px;" src="https://png.pngtree.com/png-clipart/20230104/original/pngtree-wicker-rattan-basket-png-image_8865318.png"/>

          <template v-for="_ in playerGivenPile1">
            <button style="background: none; border: none;" @click="playerRemove">
              <img style="margin-right: 8px; width: 48px; height: 48px; margin-top: auto; margin-bottom: auto;" src="https://pngfre.com/wp-content/uploads/apple-95-270x300.png">
            </button>
          </template>
        </div>

        <div style="display: flex; justify-content: center;">
        <button @click="playerReady = true" :disabled="playerOneReady">OK</button>
      </div>
      </template>

      <template v-else>
        <SingleAddMidgame :p1="playerGiven" :sum="requiredSum" :restart="setupGame"/>
      </template>
    </div>
  </div>
</template>

<style scoped>
.screen {
  min-width: 100vw;
  background-color: #8fd2e2;
  flex: 1 1;
}
</style>