<template>
  <div class="h-screen">
    <div class="flex flex-col items-center pt-48">
      <h1 class="text-7xl font-semibold text-title md:text-9xl lg:text-9xl">Flowey</h1>
      <p class="mt-8 text-2xl font-bold text-text md:text-4xl lg:text-4xl">口袋中的財務顧問</p>
    </div>
    <div class="flex flex-col items-center pb-16 pt-32">
      <button
        class="relative min-h-[3rem] w-4/5 overflow-hidden rounded-lg bg-button px-8 py-2 text-xl text-text hover:bg-buttonhover md:min-h-[5.5rem] md:w-4/6 md:px-32 md:py-6 md:text-3xl lg:px-40 lg:py-4 lg:text-3xl"
        @click="startTyping"
      >
        <p class="flex h-full w-full items-center justify-center">{{ text }}</p>
      </button>
    </div>
    <div class="flex flex-col items-center">
      <p class="text-sm text-text md:text-xl">本服務仍在開發測試階段，將不對產生之言論進行負責</p>
      <p class="text-md glow mt-12 text-text md:text-xl">Power by 懂一點商</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const text = ref('訪客點此進入')
const newText = 'Master Your Finances'
let index = 0
let isTyping = ref(false)

const deleteOldText = () => {
  const intervalId = setInterval(() => {
    if (text.value.length > 0) {
      text.value = text.value.slice(0, -1)
    } else {
      clearInterval(intervalId)
      typeNewText()
    }
  }, 100) // 每100毫秒刪除一個字
}

const typeNewText = () => {
  const intervalId = setInterval(() => {
    if (index < newText.length) {
      text.value += newText[index]
      index++
    } else {
      clearInterval(intervalId)
      isTyping.value = false
      setTimeout(() => {
        router.push('/setting')
      }, 500)
    }
  }, 60) // 每100毫秒打一個字
}

const startTyping = () => {
  if (!isTyping.value) {
    index = 0
    isTyping.value = true
    deleteOldText()
  }
}
</script>

<style scoped>
@keyframes glow {
  0% {
    text-shadow:
      0 0 5px #ff0,
      0 0 10px #ff0,
      0 0 15px #ff0,
      0 0 20px #ff0;
  }
  50% {
    text-shadow: none;
  }
  100% {
    text-shadow:
      0 0 5px #ff0,
      0 0 10px #ff0,
      0 0 15px #ff0,
      0 0 20px #ff0;
  }
}

.glow {
  color: #fff;
  animation: glow 3s infinite;
}
</style>
