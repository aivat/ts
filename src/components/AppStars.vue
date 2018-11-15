<template>
  <div class="stars-wrap">
    <ul>
      <li class="stars-item" v-for="(star, index) in numbers" :key="index">
        <svg v-if="star <= stars" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
        <svg class="stars-item-svg" v-if="star > stars" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AppStars extends Vue {
    @Prop(Number) stars!: number
    numbers: number[] =[ 1, 2, 3, 4, 5 ]
}
</script>

<style scoped>
.stars-wrap ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.stars-item {
    display: inline-block;
}
.stars-item>svg {
    fill: #f2b01e;
}
.stars-item>.stars-item-svg {
    fill: #f0f0f0;
}
</style>
