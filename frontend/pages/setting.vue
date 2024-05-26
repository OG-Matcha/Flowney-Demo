<template>
  <div class="h-full bg-bgcolor">
    <div class="flex flex-col items-center pt-16">
      <h1 class="mb-2 text-3xl font-semibold text-text md:text-4xl lg:text-5xl">個人資料設定</h1>
      <!-- <QuestionInput
        :label="'年齡'"
        :placeholder="'請輸入您的年齡'"
        :type="'number'"
      ></QuestionInput> -->
      <QuestionSelect
        :label="'性別'"
        :defaults="'請選擇您的性別'"
        :options="genderOptions"
        v-model="selectedGender"
      ></QuestionSelect>
      <QuestionSelect
        :label="'月收入'"
        :defaults="'請選擇您的月收入範圍'"
        :options="incomeOptions"
        v-model="selectedIncome"
      ></QuestionSelect>
      <!-- <QuestionInput :label="'居住地'" :placeholder="'請輸入您的居住地'"></QuestionInput>
      <QuestionInput :label="'服務單位'" :placeholder="'請輸入您的服務單位'"></QuestionInput>
      <QuestionInput :label="'職稱'" :placeholder="'請輸入您的職稱'"></QuestionInput>
      <QuestionLong :label="'當前持有資產'" :placeholder="'請輸入您當前持有的資產'"></QuestionLong>
      <QuestionLong :label="'退休目標'" :placeholder="'請輸入您的退休目標'"></QuestionLong> -->

      <NuxtLink
        class="mt-8 flex w-5/6 justify-center justify-center rounded-md border-2 border-border bg-store p-1.5 text-text hover:bg-storehover md:w-2/3"
        :to="getLink()"
      >
        <button>儲存</button>
      </NuxtLink>
      <!-- <NuxtLink
        class="mt-2 flex w-5/6 justify-center justify-center rounded-md border-2 border-border bg-store p-1.5 text-text hover:bg-storehover md:w-2/3"
        to="/credit"
      >
        <button>儲存</button>
      </NuxtLink> -->
      <NuxtLink
        class="mb-8 mt-2 flex w-5/6 justify-center rounded-md border-2 border-border bg-input p-1.5 text-text hover:bg-bgcolor md:w-2/3"
        to="/"
      >
        <button>取消</button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const genderOptions = ['男性', '女性']
let incomeOptions = ['35000~39999', '85000~89999']
// let incomeOptions = []
// for (let i = 30000; i < 100000; i += 5000) {
//   incomeOptions.push(`${i}~${i + 4999}`)
// }

const selectedGender = ref({ value: null })
const selectedIncome = ref({ value: null })

const getLink = () => {
  return {
    path: '/credit',
    query: {
      gender: selectedGender.value,
      income: selectedIncome.value
    }
  }
}
</script>
