<script setup lang="ts">
import {Ref, ref} from "vue";
import letsGoPng from "../../../assets/lets-go.png";
import checkmarkPng from "../../../assets/checkmark.png";
import applePng from "../../../assets/apple.png";
import { generateRandomNumberBetween } from "../../../utils/math";
import { Stack } from "../../../utils/Stack.ts"
import GameFinished from "./gameFinished.vue";

const target = ref(0)
const pileOne = ref(0)
const pileTwo = ref(0)
const pileMap = {"pileOne": pileOne, "pileTwo": pileTwo}
const addOrder = new Stack<Ref<number>>()
const selectedApples = ref(0);
const submitted = ref(false);
const isCorrect = ref<boolean | null>(null);
let difference = 0

const setupGame = () => {
  target.value = generateRandomNumberBetween(2, 10)
  const apples = target.value + Math.ceil(Math.random() * target.value * 0.75)
  const rand = Math.floor(apples / 4)
  pileOne.value = Math.floor(apples / 2)  + generateRandomNumberBetween(-rand, rand)
  pileTwo.value = apples - pileOne.value
  selectedApples.value = 0
  addOrder.clear()
  submitted.value = false
}



const addApple = (pile: Ref<number>) => {
    pile.value--;
    selectedApples.value++;
    addOrder.push(pile)
};

const removeApple = () => {
    if (addOrder.isEmpty()) { return }
    let pile = addOrder.pop()
    if (pile === undefined) { return }
    pile.value++;
    selectedApples.value--;
};

const submit = () => {
    isCorrect.value = selectedApples.value == target.value;
    submitted.value = true;
    difference = target.value - selectedApples.value; //if higher than target; negative
};

setupGame()
</script>

<template>
    <div class="min-h-screen bg-sky-blue-300 p-4 flex flex-col">
        <template v-if="!submitted">
            <div class="flex flex-row justify-between">
                <div class="flex flex-row gap-2">
                    <img :src="letsGoPng" class="w-24 h-auto">
                    <p class="my-auto">Count to {{ target }} apples!</p>
                </div>

                <button @click=submit>
                    <img :src="checkmarkPng" class="my-auto w-12"/>
                </button>
            </div>

          <div class="flex flex-row justify-between">
            <div>
                <button
                    v-for="_ in pileOne"
                    @click="addApple(pileMap.pileOne)"
                    class=""
                >
                    <img :src="applePng" class="w-12 h-auto"/>
                </button>
            </div>

            <div>
                <button
                    v-for="_ in pileTwo"
                    @click="addApple(pileMap.pileTwo)"
                    class=""
                >
                    <img :src="applePng" class="w-12 h-auto">
                </button>
            </div>
          </div>
            <div class="mt-12">
                <button
                    v-for="_ in selectedApples"
                    @click="removeApple"
                    class=""
                >
                    <img :src="applePng" class="w-12 h-auto"/>
                </button>
            </div>
        </template>

        <template v-else>
            <game-finished :is-correct="isCorrect" :diff="difference" :restart="setupGame"></game-finished>
        </template>
    </div>
</template>