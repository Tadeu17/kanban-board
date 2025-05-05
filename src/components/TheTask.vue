<template>
  <article class="task" :style="{ backgroundColor: task.color }">
    <p>{{ task.title }}</p>
  </article>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  task: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/effects.scss";

.task {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  padding-left: 12px;
  padding-right: 12px;
  cursor: grab;

  @media (orientation: portrait) {
    min-width: 115px;
    min-height: 160px;
  }

  @media (orientation: landscape) {
    min-width: 272px;
    min-height: 80px;
  }

  &:hover {
    @include drop-shadow;
  }
}
</style>
