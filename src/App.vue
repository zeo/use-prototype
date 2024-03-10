<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import MidGame from './MidGame.vue';

const requiredSum = ref(0)
const given = ref(0)

const solved = ref(false)

const playerOne = ref(0)
const playerOneGiven = ref(0)
const playerOneReady = ref(false)

const playerTwo = ref(0)
const playerTwoGiven = ref(0)
const playerTwoReady = ref(false)

const setupGame = () => {
  requiredSum.value = 2 + Math.floor(Math.random() * 3)
  given.value = 0
  solved.value = false

  playerOne.value = Math.ceil(requiredSum.value / 2) + Math.floor(Math.random() * 3)
  playerOneGiven.value = 0
  playerOneReady.value = false

  playerTwo.value = Math.floor(requiredSum.value / 2) + Math.floor(Math.random() * 3)
  playerTwoGiven.value = 0
  playerOneReady.value = false
};

onMounted(setupGame);

const playerOnePress = () => {
  playerOneReady.value = false
  playerOne.value--;
  playerOneGiven.value++
  given.value++;
};

const playerTwoPress = () => {
  playerTwoReady.value = false
  playerTwo.value--;
  playerTwoGiven.value++
  given.value++;
}

watchEffect(() => {
  if (playerOneReady.value && playerTwoReady.value) {
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
          <button v-for="i in playerOne" style="margin-right: 8px; background: none; border: none;" @click="playerOnePress">
            <img style="width: 64px; height: 64px;" src="https://pngfre.com/wp-content/uploads/apple-95-270x300.png">
          </button>
        </div>

        <div style="display: flex; justify-content: center;">
          <img style="width: 128px; height: 128px;" src="https://png.pngtree.com/png-vector/20230318/ourmid/pngtree-cow-animal-standing-transparent-on-white-background-png-image_6656233.png"/>
        </div>

        <div style="display: flex; justify-content: center;">
          <img style="width: 64px; height: 64px;" src="https://png.pngtree.com/png-clipart/20230104/original/pngtree-wicker-rattan-basket-png-image_8865318.png"/>

          <template v-for="i in playerOneGiven">
            <img style="margin-right: 8px; width: 48px; height: 48px; margin-top: auto; margin-bottom: auto;" src="https://pngfre.com/wp-content/uploads/apple-95-270x300.png">
          </template>
        </div>

        <div style="display: flex; justify-content: center;">
          <button @click="playerTwoReady = true" :disabled="playerTwoReady">OK</button>
        </div>
      </template>

      <template v-else>
        <MidGame :p1="playerOneGiven" :p2="playerTwoGiven" :sum="requiredSum" :restart="setupGame"/>
      </template>
    </div>

    <div class="screen2 screen" style="border-top: 2px solid;">
      <template v-if="!solved">
        <h1 style="text-align: center; margin-top: 64px;">Count to {{ requiredSum }} apples!</h1>

        <div style="display: flex; justify-content: center; margin-top: 32px;">
          <button v-for="i in playerTwo" style="margin-right: 8px; background: none; border: none;" @click="playerTwoPress">
            <img style="width: 64px; height: 64px;" src="https://pngfre.com/wp-content/uploads/apple-95-270x300.png">
          </button>
        </div>

        <div style="display: flex; justify-content: center;">
          <img style="width: 128px; height: 128px;" src="https://png.pngtree.com/png-vector/20230318/ourmid/pngtree-cow-animal-standing-transparent-on-white-background-png-image_6656233.png"/>
        </div>

        <div style="display: flex; justify-content: center;">
          <img style="width: 64px; height: 64px;" src="https://png.pngtree.com/png-clipart/20230104/original/pngtree-wicker-rattan-basket-png-image_8865318.png"/>

          <template v-for="i in playerTwoGiven">
            <img style="margin-right: 8px; width: 48px; height: 48px; margin-top: auto; margin-bottom: auto;" src="https://pngfre.com/wp-content/uploads/apple-95-270x300.png">
          </template>
        </div>

        <div style="display: flex; justify-content: center;">
          <button @click="playerOneReady = true" :disabled="playerOneReady">OK</button>
        </div>
      </template>
      
      <template v-else>
        <MidGame :p1="playerOneGiven" :p2="playerTwoGiven" :sum="requiredSum" :restart="setupGame"/>
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

.screen1 {
  transform: rotate(180deg)
}
</style>
