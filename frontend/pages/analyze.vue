<template>
  <div class="flex h-screen flex-col items-center">
    <div class="loader"></div>
    <p class="mt-8 text-2xl text-text">
      正在分析您一個月的財務帳目<span class="dots text-text">...</span>
    </p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

onMounted(() => {
  setTimeout(() => {
    router.push({
      path: '/result',
      query: { gender: route.query.gender, income: route.query.income }
    })
  }, 5000)
})
</script>

<style scope>
.loader {
  margin-top: 18rem;
  width: 60px;
  aspect-ratio: 1;
  background: linear-gradient(45deg, #60b99a 50%, #0000 0),
    linear-gradient(45deg, #0000 50%, #60b99a 0), linear-gradient(-45deg, #f77825 50%, #0000 0),
    linear-gradient(-45deg, #0000 50%, #f77825 0), linear-gradient(#554236 0 0);
  background-size: 50% 50%;
  background-repeat: no-repeat;
  animation: l18 1.5s infinite;
}
@keyframes l18 {
  0% {
    background-position:
      50% 50%,
      50% 50%,
      50% 50%,
      50% 50%,
      50% 50%;
  }
  25% {
    background-position:
      0 100%,
      100% 0,
      50% 50%,
      50% 50%,
      50% 50%;
  }
  50% {
    background-position:
      0 100%,
      100% 0,
      100% 100%,
      0 0,
      50% 50%;
  }
  75% {
    background-position:
      50% 50%,
      50% 50%,
      100% 100%,
      0 0,
      50% 50%;
  }
  100% {
    background-position:
      50% 50%,
      50% 50%,
      50% 50%,
      50% 50%,
      50% 50%;
  }
}

.dots {
  display: inline-block;
  width: 0.5em;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  animation: dots 1s steps(3, end) infinite;
  vertical-align: bottom;
}

@keyframes dots {
  0%,
  20% {
    text-indent: -1em;
  }
  40% {
    text-indent: -0.67em;
  }
  60% {
    text-indent: -0.33em;
  }
  80%,
  100% {
    text-indent: 0;
  }
}
</style>
