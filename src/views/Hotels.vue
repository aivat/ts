<template>
  <div class="hello">
    <h1>Отели</h1>
    <select v-on:change="setCountHotels" v-model.number.lazy="params.limit">
      <option disabled value="">Количество отелей на странице</option>
      <option>5</option>
      <option>10</option>
      <option>15</option>
      <option>20</option>
    </select>
    <span>Выбрано: {{ params.limit }}</span>
    <div>Число отелей {{ meta.count }} </div>
    <ul>
      <li v-for="(hotel, index) in hotels" :key="hotel.id">
        {{ index }}
        {{ hotel.id }}
        {{ hotel.name }}
      </li>
    </ul>
    <button v-on:click="setPageHotels(0)">0</button>
    <button v-on:click="setPageHotels(1)">1</button>
    <button v-on:click="setPageHotels(meta.totalPages - 1)">{{ meta.totalPages - 1 }}</button>
    <button v-on:click="setPageHotels(meta.totalPages)">{{ meta.totalPages }}</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
//import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
@Component
export default class Hotels extends Vue {
  selected: number = 20
  params: IParams = {
    limit: 15,
    name: null,
    page: 0
  }
  created() {
    this.$store.dispatch('getHotels', this.params)
  }
  get hotels() {
    return this.$store.state.hotels.hotels
  }
  get meta() {
    return this.$store.state.hotels.meta
  }
  setCountHotels() {
    this.params.page = 0
    this.$store.dispatch('getHotels', this.params)
  }
  setPageHotels(page) {
    this.params.page = page
    this.$store.dispatch('getHotels', this.params)
  }
}

interface IParams {
    limit: number;
    name: any;
    page: number;
}
</script>
