<template>
  <div class="h-screen overflow-y-auto overflow-x-hidden">
    <NuxtPage />
  </div>
</template>

<style>
body {
  background-color: #212121;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-in-out;
}
.slide-enter-from {
  opacity: 0;
  transform: translateY(100%);
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
