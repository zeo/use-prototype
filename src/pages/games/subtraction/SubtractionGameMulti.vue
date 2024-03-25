<script setup lang="ts">
import {SplitScreen} from "../../../components";
import {ref} from "vue";
import {generateRandomNumberBetween} from "../../../utils/math.ts";
import {shuffleArray} from "../../../utils/array.ts";
import bananaPng from "../../../assets/banana.png";
import monkeyPng from "../../../assets/monkey.png";

const first = ref(generateRandomNumberBetween(3, 15));
const second = ref(generateRandomNumberBetween(2, first.value - 1));
const answer = ref(first.value - second.value);

const answers = ref(shuffleArray(Array.from({length: 8}, (_, i) => i + Math.floor(answer.value/2))));
const answerIndex = ref(answers.value.indexOf(answer.value))
const selectedAnswer = ref<number | null>(null)

const selectAnswer = (i: number) => {
  selectedAnswer.value = i;
};

</script>

<template>
  <div class="min-h-screen bg-goldenrod-200">
    <SplitScreen>
      <template #one>
        <div class="p-4 flex flex-col">
          <div class="flex flex-row center">
            <div class="flex flex-row gap-2">
              <img :src="monkeyPng" class="w-24 h-auto">
              <p class="my-auto">How many bananas are left?</p>
            </div>
          </div>

          <div class="flex flex-row center">
            <p>{{ first }}</p>
            <img :src="bananaPng" class="w-12 h-auto"/>
            <p>-</p>
            <p>{{ second }}</p>
            <img :src="bananaPng" class="w-12 h-auto"/>
            <p>=</p>
            <p>?</p>
            <img :src="bananaPng" class="w-12 h-auto"/>
          </div>
          <div class="grid grid-cols-4 gap-4">
            <button
                v-for="(answer, i) in answers.slice(4, 8)"
                class="rounded-md py-2"
                :class="(selectedAnswer === null || selectedAnswer != i + 4) ? 'bg-goldenrod-100' : (selectedAnswer === answerIndex ? 'bg-green-300' : 'bg-red-300')"
                @click="selectAnswer(i + 4)"
            >
              <img :src="bananaPng" class="mx-auto w-12 h-auto"/>
              {{ answer }}
            </button>
          </div>
        </div>
      </template>
      <template #two>
        <div class="p-4 flex flex-col">
          <div class="flex flex-row center">
            <div class="flex flex-row gap-2">
              <img :src="monkeyPng" class="w-24 h-auto">
              <p class="my-auto">How many bananas are left?</p>
            </div>
          </div>

          <div class="flex flex-row center">
            <p>{{ first }}</p>
            <img :src="bananaPng" class="w-12 h-auto"/>
            <p>-</p>
            <p>{{ second }}</p>
            <img :src="bananaPng" class="w-12 h-auto"/>
            <p>=</p>
            <p>?</p>
            <img :src="bananaPng" class="w-12 h-auto"/>
          </div>

          <div class="grid grid-cols-4 gap-4">
            <button
                v-for="(answer, i) in answers.slice(0, 4)"
                class="rounded-md py-2"
                :class="(selectedAnswer === null || selectedAnswer != i) ? 'bg-goldenrod-100' : (selectedAnswer === answerIndex ? 'bg-green-300' : 'bg-red-300')"
                @click="selectAnswer(i)"
            >
              <img :src="bananaPng" class="mx-auto w-12 h-auto"/>
              {{ answer }}
            </button>
          </div>
        </div>
      </template>
    </SplitScreen>
  </div>
</template>


<style>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>