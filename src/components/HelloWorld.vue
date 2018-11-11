<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="hotel in hotels" :key="hotel.id">
        {{ hotel.name }}
      </li>
    </ul>
    <h2>{{ aivat }}</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
 msg = 123
  created () {
    let qwe = {
      limit: 15,
      name: null,
      page: 0
    }
    this.$store.dispatch('getHotels', qwe)
  }
  get hotels () {
    return this.$store.state.hotels.hotels
  }
  get aivat () {
    return this.$store.state.hotels.qwe
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
