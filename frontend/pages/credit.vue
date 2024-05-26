<template>
  <div class="h-full overflow-hidden bg-bgcolor">
    <div class="flex flex-col items-center pt-16">
      <h1 class="mb-2 text-3xl font-semibold text-text md:text-4xl lg:text-5xl">自動帳目紀錄</h1>
      <Cards ref="cards" @cardsEmpty="handleCardsEmpty"></Cards>
      <div class="mt-16 flex w-screen justify-around text-text md:mt-32">
        <button class="animate-left-slide mr-2 text-6xl">←</button>
        <button class="animate-right-slide text-6xl">→</button>
      </div>
      <div class="mt-4 flex w-screen justify-around text-text">
        <button class="text-greenyellow mr-2 text-4xl">正確</button>
        <button class="text-red text-4xl">錯誤</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const cards = ref(null)

onMounted(() => {
  const gender = ref(route.query.gender ? route.query.gender : '')
  const income = ref(route.query.income ? route.query.income : '')
})

const handleCardsEmpty = () => {
  setTimeout(() => {
    router.push({
      path: '/complete',
      query: { gender: route.query.gender, income: route.query.income }
    })
  }, 1000)
}
</script>

<style scoped>
@keyframes left-slide {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes right-slide {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(0);
  }
}
.animate-left-slide {
  animation: left-slide 1s infinite;
}
.animate-right-slide {
  animation: right-slide 1s infinite;
}
.text-greenyellow {
  text-shadow:
    -0.5px 0 greenyellow,
    0 0.5px greenyellow,
    0.5px 0 greenyellow,
    0 -0.5px greenyellow;
}
.text-red {
  text-shadow:
    -0.5px 0 red,
    0 0.5px red,
    0.5px 0 red,
    0 -0.5px red;
}
</style>
