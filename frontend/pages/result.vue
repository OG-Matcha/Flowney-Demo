<template>
  <div class="flex h-screen flex-col bg-result">
    <div class="flex w-full items-center justify-center bg-bgcolor">
      <h1 class="m-8 text-3xl text-text">帳目分析結果</h1>
    </div>
    <p class="m-4 text-text" v-html="text"></p>
    <div v-if="showProgress" class="wrapper flex flex-col">
      <p class="mb-3 text-xl font-bold text-text">退休目標完成度</p>
      <div class="progress-bar" :style="{ opacity: showProgress ? 1 : 0 }">
        <div class="progress" :style="{ '--progressValue': progressValue }"></div>
      </div>
      <p class="mt-1 text-text">{{ (progress * 100).toFixed(2) }}%</p>
    </div>
    <div v-if="showButton" class="flex items-center justify-center">
      <nuxt-link to="/" class="w-4/5">
        <button
          class="button mb-4 min-h-[1rem] w-full rounded-lg bg-button px-8 py-2 text-xl text-text hover:bg-buttonhover"
          :style="{ opacity: showButton ? 1 : 0 }"
        >
          感謝您的體驗
        </button>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const text = ref('')
const showProgress = ref(false)
const showButton = ref(false)
const progress = ref(0)
const progressValue = ref(0)

watchEffect(() => {
  if (showProgress.value) {
    progress.value = Math.random()
    progressValue.value = progress.value * 100 + '%'
    document.documentElement.style.setProperty('--progressValue', progressValue.value)
  }
})

onMounted(async () => {
  const response = await fetch('http://localhost/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      gender: route.query.gender,
      income: route.query.income
    })
  })

  if (response.body) {
    const reader = response.body.getReader()
    let result = ''

    while (true) {
      const { done, value } = await reader.read()

      if (done) {
        break
      }

      result += new TextDecoder('utf-8').decode(value)
      text.value = result.replace(/\n/g, '<br>')
    }
  }
  await new Promise((resolve) => setTimeout(resolve, 2000))

  showProgress.value = true
  await nextTick()
  showButton.value = true
})
</script>

<style scoped>
.wrapper {
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: auto;
}

.progress-bar {
  width: 100%;
  height: 20px;
  border-radius: 50px;
  overflow: hidden;
  border: 1px solid deepskyblue;
  padding: 6px;
  opacity: 0;
  transition: opacity 2s ease-in;
}

.progress {
  height: 100%;
  background-color: #00a0ff;
  border-radius: 10px;
  animation: animate 3s linear forwards;
}

.button {
  opacity: 0;
  transition: opacity 2s ease-in;
}

@keyframes animate {
  0% {
    width: 0;
  }
  100% {
    width: var(--progressValue);
  }
}
</style>
