<template>
  <div class="relative mt-8 h-[15rem] w-[20rem] md:w-[30rem]">
    <img
      v-for="(card, index) in cards"
      :key="index"
      @mousedown="(e) => handleMouseDown(e, index)"
      @touchstart="(e) => handleTouchStart(e, index)"
      @dragstart.prevent
      :style="{ transform: transformValues[index].value }"
      :src="card.image"
      class="absolute mt-7 w-full"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

let cards = ref([
  { image: 'Card_4.png' },
  { image: 'Card_3.png' },
  { image: 'Card_2.png' },
  { image: 'Card_1.png' }
])

let isAnimating = ref(false)
let startPoint = null
let transformValues = cards.value.map(() => ref(''))
let offsetX = 0
let offsetY = 0
let currentCardIndex = null
let animationFrameId = null

const emit = defineEmits(['cardsEmpty'])

watchEffect(() => {
  if (cards.value.length === 0) {
    emit('cardsEmpty')
  }
})

const animateCardOut = (direction) => {
  isAnimating.value = true
  const speed = 20
  offsetX += direction * speed
  const rotate = offsetX * 0.1
  transformValues[currentCardIndex].value =
    `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`

  if (Math.abs(offsetX) < window.innerWidth + 100) {
    animationFrameId = requestAnimationFrame(() => animateCardOut(direction))
  } else {
    if (startPoint !== null) {
      cancelAnimationFrame(animationFrameId)
    }
    if (Math.abs(offsetX) >= window.innerWidth + 100) {
      cards.value.splice(currentCardIndex, 1)
    }
    isAnimating.value = false
  }
}

const animateCardBack = () => {
  isAnimating.value = true
  const speed = 0.1
  offsetX -= offsetX * speed
  offsetY -= offsetY * speed
  const rotate = offsetX * 0.1
  transformValues[currentCardIndex].value =
    `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`

  if (Math.abs(offsetX) > 1 || Math.abs(offsetY) > 1) {
    animationFrameId = requestAnimationFrame(animateCardBack)
  } else {
    offsetX = 0
    offsetY = 0
    transformValues[currentCardIndex].value = ''
    cancelAnimationFrame(animationFrameId)
    isAnimating.value = false
  }
}

const handleMove = (x, y) => {
  offsetX = x - startPoint.x
  offsetY = y - startPoint.y
  const rotate = offsetX * 0.1
  transformValues[currentCardIndex].value =
    `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`

  const threshold = (window.innerWidth * 3) / 8
  if (Math.abs(offsetX) > threshold) {
    const direction = offsetX > 0 ? 1 : -1
    animateCardOut(direction)
    startPoint = null
  }
}

const handleMouseDown = (e, index) => {
  e.preventDefault()

  if (startPoint || isAnimating.value) return
  const { clientX, clientY } = e
  startPoint = { x: clientX, y: clientY }
  currentCardIndex = index
  document.addEventListener('mousemove', handleMouseMove)
  transformValues[currentCardIndex].value = 'transform 0s'
}

const handleMouseMove = (e) => {
  if (!startPoint) return
  const { clientX, clientY } = e
  handleMove(clientX, clientY)
}

const handleMouseUp = () => {
  document.removeEventListener('mousemove', handleMouseMove)
  if (Math.abs(offsetX) > (window.innerWidth * 3) / 8) {
    const direction = offsetX > 0 ? 1 : -1
    animateCardOut(direction)
  } else {
    animateCardBack()
  }
  startPoint = null
}

const handleTouchStart = (e, index) => {
  e.preventDefault()
  const touch = e.changedTouches[0]
  if (!touch || startPoint || isAnimating.value) return
  const { clientX, clientY } = touch
  startPoint = { x: clientX, y: clientY }
  currentCardIndex = index
  document.addEventListener('touchmove', handleTouchMove)
  transformValues[currentCardIndex].value = 'transform 0s'
}

const handleTouchMove = (e) => {
  if (!startPoint) return
  const touch = e.changedTouches[0]
  if (!touch) return
  const { clientX, clientY } = touch
  handleMove(clientX, clientY)
}

const handleTouchEnd = () => {
  document.removeEventListener('touchmove', handleTouchMove)
  if (Math.abs(offsetX) > (window.innerWidth * 3) / 8) {
    const direction = offsetX > 0 ? 1 : -1
    animateCardOut(direction)
  } else {
    animateCardBack()
  }
  startPoint = null
}

onMounted(() => {
  document.addEventListener('mouseup', handleMouseUp)
  document.addEventListener('touchend', handleTouchEnd)
})

onUnmounted(() => {
  document.removeEventListener('mouseup', handleMouseUp)
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('touchend', handleTouchEnd)
  document.removeEventListener('touchmove', handleTouchMove)
})
</script>
