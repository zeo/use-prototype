<script setup lang="ts">
import { SplitScreen } from '../../../components';
import {Ref, ref} from "vue";
import applePng from "../../../assets/apple.png";
import {generateRandomNumberBetween} from "../../../utils/math.ts";
import crossPng from "../../../assets/cross.png"
import checkmarkPng from "../../../assets/checkmark.png";

import GameFinished from "./gameFinished.vue";
import letsGoPng from "../../../assets/lets-go.png";

const targetAppels = ref(0)
const playerOneApples = ref(0)
const playerOneTotal = ref(0)
const playerTwoApples = ref(0)
const playerTwoTotal = ref(0)
const givenApples = ref(0)
const playerOneReady = ref(false)
const playerTwoReady = ref(false)
const playerMap = {"playerOne": playerOneApples, "playerTwo": playerTwoApples}

const setupGame = () => {
  targetAppels.value = generateRandomNumberBetween(4, 9)
  const apples = targetAppels.value + Math.floor(Math.random() * targetAppels.value / 3)
  const rand = Math.floor(apples / 3)
  playerOneApples.value = Math.floor(apples / 2)  + generateRandomNumberBetween(-rand, rand)
  playerOneTotal.value = playerOneApples.value
  playerTwoApples.value = apples - playerOneApples.value
  playerTwoTotal.value = playerTwoApples.value
  givenApples.value = 0
  playerOneReady.value = false
  playerTwoReady.value = false
}
const gamesPlayed = ref(0)
const gamesCorrect = ref(0)

const playerGive = (player: Ref<number>) => {
  givenApples.value++;
  player.value--;
}

const playerRemove = (player: Ref<number>) => {
  givenApples.value--;
  player.value++;
}

const playerSubmit = (player: Ref<boolean>) => {
  player.value = !player.value

  if (playerOneReady.value && playerTwoReady.value) {
    gamesPlayed.value++;
    
    if (targetAppels.value == givenApples.value) {
      gamesCorrect.value++;
    }
  }
}

const playerOneSubmit = () => {
  playerSubmit(playerOneReady)
}

const playerTwoSubmit = () => {
  playerSubmit(playerTwoReady)
}

setupGame()
</script>


<template>
    <div class="min-h-screen bg-sky-blue-300">

        <SplitScreen>
            <template #one>
              <div v-if="playerOneReady && playerTwoReady" class="h-full">
                  <div v-if="gamesPlayed == 5" class="flex h-full text-center">
                    <div class="mx-auto my-auto">
                      <p class="text-lg">You scored:</p>
                      <p class="font-bold" :class="gamesCorrect == 5 ? 'text-green-600' : ''">{{ gamesCorrect }} / {{  gamesPlayed }}</p>
                    </div>
                  </div>

                  <game-finished v-else :is-correct="targetAppels === givenApples" :diff="targetAppels - givenApples" :restart="setupGame"></game-finished>
              </div>
              <div v-else>
                <div class="flex flex-row justify-between">
                  <div class="flex flex-row gap-2">
                    <img :src="letsGoPng" class="w-24 h-auto">
                    <p class="my-auto">Count to {{ targetAppels }} apples!</p>
                  </div>
                  <button @click="playerOneSubmit">
                    <img :src="playerOneReady ? crossPng : checkmarkPng" class="my-auto w-12"/>
                  </button>
                </div>
                <div class="flex flex-row justify-between">
                <div>
                    <button v-for="_ in playerOneApples" @click="playerGive(playerMap.playerOne)" class="">
                        <img :src="applePng" class="w-12 h-auto">
                    </button>
                </div>
                <div>
                  <button v-for="_ in playerOneTotal - playerOneApples" @click="playerRemove(playerMap.playerOne)" class="">
                    <img :src="applePng" class="w-12 h-auto">
                  </button>
                </div>
                </div>
              </div>
            </template>
                
            <template #two>
              <div v-if="playerOneReady && playerTwoReady" class="h-full">
                <div v-if="gamesPlayed == 5" class="flex h-full">
                    <div class="mx-auto my-auto text-center">
                      <p class="text-lg">You scored:</p>
                      <p class="font-bold" :class="gamesCorrect == 5 ? 'text-green-600' : ''">{{ gamesCorrect }} / {{  gamesPlayed }}</p>
                    </div>
                  </div>

                <game-finished v-else :is-correct="targetAppels === givenApples" :diff="targetAppels - givenApples" :restart="setupGame"></game-finished>
              </div>
              <div v-else>
                <div class="flex flex-row justify-between">
                  <div class="flex flex-row gap-2">
                    <img :src="letsGoPng" class="w-24 h-auto">
                    <p class="my-auto">Count to {{ targetAppels }} apples!</p>
                  </div>
                  <button @click="playerTwoSubmit">
                    <img :src="playerTwoReady ? crossPng : checkmarkPng" class="my-auto w-12"/>
                  </button>
                </div>
                <div class="flex flex-row justify-between">
                <div>
                    <button v-for="_ in playerTwoApples" @click="playerGive(playerMap.playerTwo)" class="">
                        <img :src="applePng" class="w-12 h-auto">
                    </button>
                </div>
                <div>
                    <button v-for="_ in playerTwoTotal - playerTwoApples" @click="playerRemove(playerMap.playerTwo)" class="">
                        <img :src="applePng" class="w-12 h-auto">
                    </button>
                </div>
                </div>
              </div>
            </template>
        </SplitScreen>
    </div>
</template>