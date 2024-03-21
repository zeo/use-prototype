<script setup lang="ts">
import { ref } from "vue";
import lionPng from "../../../assets/lion.png";
import lionSuccessPng from "../../../assets/lion-success.png";
import lionNoPng from "../../../assets/lion-no.png";
import { generateRandomNumberBetween } from "../../../utils/math";
import { shuffleArray } from "../../../utils/array";

const inBus = ref(generateRandomNumberBetween(0, 3));
const enterBus = ref(generateRandomNumberBetween(1, 4));
const answer = ref(inBus.value + enterBus.value);

const answers = ref(shuffleArray([answer.value, answer.value - 2, answer.value - 1, answer.value + 1]));
const answerIndex = ref(answers.value.indexOf(answer.value));
const selectedAnswer = ref<number | null>(null);

const selectAnswer = (i: number) => {
    selectedAnswer.value = i;
};
</script>

<template>
    <div class="min-h-screen bg-chelsea-cucumber-400 p-4 flex flex-col">
        <div class="flex flex-row">
            <div class="flex flex-row gap-2">
                <img :src="lionPng" class="w-24 h-auto">
                <p class="my-auto">How many people are in the bus?</p>
            </div>
        </div>

        <div v-if="selectedAnswer === null">
            {{ enterBus }} => {{ inBus }}
        </div>

        <div v-else class="m-auto">
            <img :src="selectedAnswer ? lionSuccessPng : lionNoPng" class="w-64 h-auto"/>
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