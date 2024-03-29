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


const inBus = ref(generateRandomNumberBetween(0, 3));
const enterBus = ref(generateRandomNumberBetween(inBus.value >= 1 ? 1 : 2, 5));
const leaveBus = ref(generateRandomNumberBetween(1, inBus.value + enterBus.value - 1 ))
const answer = ref(inBus.value + enterBus.value - leaveBus.value);

const answers = ref(shuffleArray(Array.from({length: 4}, (_, i) => answer.value + i - ((answer.value - 2) >= 0 ? 2 : 0))));
const answerIndex = ref(answers.value.indexOf(answer.value));
const selectedAnswer = ref<number | null>(null);

const retry = () => {
  selectedAnswer.value = -1;
}

const selectAnswer = (i: number) => {
    selectedAnswer.value = i;
};
</script>

<template>
    <div class="min-h-screen bg-chelsea-cucumber-400 p-4 flex flex-col">
        <div class="flex flex-row">
            <div class="flex flex-row gap-2">
                <img :src="lionPng" class="w-24 h-auto">
                <p class="my-auto">How many lions are in the bus at the end?</p>
            </div>
        </div>

        <div v-if="(selectedAnswer === null || selectedAnswer === -1)">
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
                <br>
              </div>
            </div>
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
            <template v-if="selectedAnswer != answerIndex">
              <img :src="lionNoPng" class="w-64 h-auto"/>
              <p>That's not quite correct, try again!</p>
              <button @click="retry">Restart</button>
            </template>
            <template v-else>
              <img :src="lionSuccessPng" class="w-64 h-auto"/>
              <p>Well done!</p>
              <router-link
                to='/games/bus'
                class="bg-chelsea-cucumber-300 p-2 text-black text-center rounded-md"
              >
                Restart
              </router-link>
            </template>
        </div>


        <div class="grid grid-cols-4 gap-4">
            <button
                v-for="(answer, i) in answers"
                class="rounded-md py-2"
                :class="(selectedAnswer === null || selectedAnswer != i) ? 'bg-chelsea-cucumber-300' : (selectedAnswer === answerIndex ? 'bg-green-300' : 'bg-red-300')"
                @click="selectAnswer(i)"
            >
                <img :src="lionPng" class="mx-auto w-12 h-auto"/>
                {{ answer }}
            </button>
        </div>
    </div>
</template>