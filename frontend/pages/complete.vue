<template>
  <div class="flex h-screen flex-col items-center">
    <div class="circle-loader mt-48" ref="loader">
      <div class="checkmark draw" ref="checkmark" v-show="showCheckmark"></div>
    </div>
    <p class="mt-8 text-3xl text-text">已完成帳目確認</p>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const loader = ref(null)
const checkmark = ref(null)
const showCheckmark = ref(false)
const router = useRouter()
const route = useRoute()

onMounted(async () => {
  await nextTick()
  setTimeout(() => {
    loader.value.classList.toggle('load-complete')
    showCheckmark.value = !showCheckmark.value
  }, 500)

  setTimeout(() => {
    router.push({
      path: '/analyze',
      query: { gender: route.query.gender, income: route.query.income }
    })
  }, 2000)
})
</script>

<style scoped>
.circle-loader {
  margin-bottom: 7em/2;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-left-color: #5cb85c;
  animation: loader-spin 1.2s infinite linear;
  position: relative;
  display: inline-block;
  vertical-align: top;
  border-radius: 50%;
  width: 7em;
  height: 7em;
}

.load-complete {
  -webkit-animation: none;
  animation: none;
  border-color: #5cb85c;
  transition: border 500ms ease-out;
}

.checkmark.draw:after {
  animation-duration: 800ms;
  animation-timing-function: ease;
  animation-name: checkmark;
  transform: scaleX(-1) rotate(135deg);
}

.checkmark:after {
  opacity: 1;
  height: calc(7em / 2);
  width: calc(7em / 6 + 7em / 12);
  transform-origin: left top;
  border-right: 3px solid #5cb85c;
  border-top: 3px solid #5cb85c;
  content: '';
  left: calc(7em / 6 + 7em / 12);
  top: calc(7em / 2);
  position: absolute;
}

@keyframes loader-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes checkmark {
  0% {
    height: 0;
    width: 0;
    opacity: 1;
  }
  20% {
    height: 0;
    width: 7em/6 + 7em/12;
    opacity: 1;
  }
  40% {
    height: 7em/2;
    width: 7em/6 + 7em/12;
    opacity: 1;
  }
  100% {
    height: 7em/2;
    width: 7em/6 + 7em/12;
    opacity: 1;
  }
}
</style>
