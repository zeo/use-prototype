<script setup lang="ts">
import { SplitScreen } from '../../../components';
import {Ref, ref, watch, watchEffect} from "vue";
import applePng from "../../../assets/apple.png";
import {generateRandomNumberBetween} from "../../../utils/math.ts";
import checkmarkPng from "../../../assets/checkmark.png";
import perfectPng from "../../../assets/perfect.png";
import noPng from "../../../assets/no.png";
import GameFinished from "./gameFinished.vue";

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
              <div v-if="playerOneReady && playerTwoReady">
                  <game-finished :is-correct="targetAppels === givenApples" :restart="setupGame"></game-finished>
              </div>
              <div v-else>
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
                <button @click="playerOneSubmit">
                  <img :src="checkmarkPng" class="my-auto w-12"/>
                </button>
              </div>
            </template>
                
            <template #two>
              <div v-if="playerOneReady && playerTwoReady">
                <game-finished :is-correct="targetAppels === givenApples" :restart="setupGame"></game-finished>
              </div>
              <div v-else>
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
                <button @click="playerTwoSubmit">
                  <img :src="checkmarkPng" class="my-auto w-12"/>
                </button>
              </div>
            </template>
        </SplitScreen>
    </div>
</template>