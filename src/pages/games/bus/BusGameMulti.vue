<script setup lang="ts">
import { ref } from "vue";
import lionPng from "../../../assets/lion.png";
import lionSuccessPng from "../../../assets/lion-success.png";
import lionNoPng from "../../../assets/lion-no.png";
import lionGo from "../../../assets/lion-go.png"
import bus from "../../../assets/bus.png"
import arrow from "../../../assets/arrow.png"
import { generateRandomNumberBetween } from "../../../utils/math";
import { shuffleArray } from "../../../utils/array";
import {SplitScreen} from "../../../components";


const inBus = ref(generateRandomNumberBetween(0, 3));
const enterBus = ref(generateRandomNumberBetween(inBus.value >= 1 ? 1 : 2, 5));
const leaveBus = ref(generateRandomNumberBetween(1, inBus.value + enterBus.value - 1 ))
const answer = ref(inBus.value + enterBus.value - leaveBus.value);

const answers = ref(shuffleArray(Array.from({length: 4}, (_, i) => answer.value + i - ((answer.value - 2) >= 0 ? 2 : 0))));
const answerIndex = ref(answers.value.indexOf(answer.value));
const playerOneAnswer = ref<number | null>(null);
const playerTwoAnswer = ref<number | null>(null);

const selectAnswerOne = (i: number) => {
  playerOneAnswer.value = i;
};

const selectAnswerTwo = (i: number) => {
  playerTwoAnswer.value = i;
}

const retry = () => {
  playerOneAnswer.value = -1;
  playerTwoAnswer.value = -1
}

</script>

<template>
  <div class="min-h-screen bg-chelsea-cucumber-400">
  <SplitScreen>
    <template #one>
      <div class="flex flex-row">
        <div class="flex flex-row gap-2">
          <img :src="lionPng" class="w-24 h-auto">
          <p class="my-auto">How many lions are in the bus? Work together to find the answer!</p>
        </div>
      </div>

      <div v-if="playerOneAnswer === null || (playerTwoAnswer != playerOneAnswer) || playerOneAnswer == -1">
        <div class="flex flex-col">
          <div class="flex flex-row">
            <div class="flex flex-col">
              <h1 class="font-bold text-4xl">{{ enterBus }}</h1>
              <div class="flex flex-row">
                <img v-for="_ in enterBus" :src="lionGo" class="mx-auto w-32 h-auto">
              </div>
            </div>
            <div>
              <img :src="arrow" class="mx-auto w-32 h-auto rotate-90">
            </div>
            <div>
              <div class="flex flex-row">
                <h1 class="font-bold text-3xl">{{ inBus }}</h1>
                <img v-for="_ in inBus" :src="lionPng" class="mx-auto w-10 h-auto">
              </div>

              <img :src="bus" class="mx-auto w-32 h-auto">
            </div>
          </div>
        </div>
      </div>

      <div v-else class="m-auto">
        <template v-if="playerOneAnswer != answerIndex">
          <div class="flex flex-row gap-4">
            <img :src="lionNoPng" class="w-64 h-auto"/>
            <div class="m-auto">
              <p>That's not quite correct, try again!</p>
              <button @click="retry" class="bg-chelsea-cucumber-300 p-2 text-black text-center rounded-md">Restart</button>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="flex flex-row gap-4">
            <img :src="lionSuccessPng" class="w-64 h-auto"/>
            <div class="m-auto">
              <p>Well done!</p>
              <router-link
                to='/games/bus'
                class="bg-chelsea-cucumber-300 p-2 text-black text-center rounded-md"
              >
                Restart
              </router-link>
            </div>
          </div>
        </template>
      </div>


      <div class="grid grid-cols-4 gap-4">
        <button
            v-for="(answer, i) in answers"
            class="rounded-md py-2"
            :class="(playerOneAnswer === null || playerOneAnswer != i) ? 'bg-chelsea-cucumber-300'
            : (playerOneAnswer === playerTwoAnswer ?  (playerOneAnswer === answerIndex ? 'bg-green-300' : 'bg-red-300') : 'bg-blue-300')"
            @click="selectAnswerOne(i)"
        >
          <img :src="lionPng" class="mx-auto w-12 h-auto"/>
          {{ answer }}
        </button>
      </div>
    </template>

    <template #two>
      <div class="flex flex-row">
        <div class="flex flex-row gap-2">
          <img :src="lionPng" class="w-24 h-auto">
          <p class="my-auto">How many lions are in the bus? Work together to find the answer!</p>
        </div>
      </div>

      <div v-if="playerTwoAnswer === null || (playerOneAnswer != playerTwoAnswer) || playerOneAnswer == -1">
        <div class="flex flex-col">
          <div class="flex flex-row">
            <div>
              <img :src="bus" class="mx-auto w-32 h-auto">
            </div>
            <div>
              <img :src="arrow" class="mx-auto w-32 h-auto rotate-90">
            </div>
            <div class="flex flex-col">
              <h1 class="font-bold text-4xl">{{ leaveBus }}</h1>
              <div class="flex flex-row">
                <img v-for="_ in leaveBus" :src="lionGo" class="mx-auto w-32 h-auto">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="m-auto">
        <template v-if="playerOneAnswer != answerIndex">
          <div class="flex flex-row gap-4">
            <img :src="lionNoPng" class="w-64 h-auto"/>
            <div class="m-auto">
              <p>That's not quite correct, try again!</p>
              <button @click="retry" class="bg-chelsea-cucumber-300 p-2 text-black text-center rounded-md">Restart</button>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="flex flex-row gap-4">
            <img :src="lionSuccessPng" class="w-64 h-auto"/>
            <div class="m-auto">
              <p>Well done!</p>
              <router-link
                to='/games/bus'
                class="bg-chelsea-cucumber-300 p-2 text-black text-center rounded-md"
              >
                Restart
              </router-link>
            </div>
          </div>
        </template>
      </div>


      <div class="grid grid-cols-4 gap-4">
        <button
            v-for="(answer, i) in answers"
            class="rounded-md py-2"
            :class="(playerTwoAnswer === null || playerTwoAnswer != i) ? 'bg-chelsea-cucumber-300' :
                (playerOneAnswer === playerTwoAnswer ? (playerTwoAnswer === answerIndex ? 'bg-green-300' : 'bg-red-300') : 'bg-blue-300')"
            @click="selectAnswerTwo(i)"
        >
          <img :src="lionPng" class="mx-auto w-12 h-auto"/>
          {{ answer }}
        </button>
      </div>
    </template>
  </SplitScreen>
  </div>
</template>