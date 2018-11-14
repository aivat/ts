<template>
  <div class="hello">
    <h1>Учетки</h1>
    <select v-on:change="setCountHotels" v-model.number.lazy="params.limit">
      <option disabled value="">Количество учеток на странице</option>
      <option>5</option>
      <option>10</option>
      <option>15</option>
      <option>20</option>
    </select>
    <span>Выбрано: {{ params.limit }}</span>
    <div>Число учеток {{ meta.count }} </div>
    <input v-model="searchHotels" placeholder="Введите название медицинской организации">
    <div class="loading" v-if="loading">
      Загрузка...
    </div>
    <div class="list">
    <ul v-if="hotels">
      <li v-for="(hotel, index) in hotels" :key="hotel.id">
        {{ index }}
        {{ hotel.id }}
        {{ hotel.stars }}
         <router-link :to="{ name: 'hotel', params: { id: hotel.id }}">{{ hotel.name }}</router-link>
      </li>
    </ul>
    </div>
    <nav>
      <button v-if="params.page > 0" v-on:click="setPageHotels(params.page - 1)">Назад</button>
      {{ params.page }} / {{ meta.totalPages }}
      <button v-if="params.page < meta.totalPages" v-on:click="setPageHotels(params.page + 1)">Вперед</button>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

interface IParams {
    limit: number;
    name: any;
    page: number;
}

@Component
export default class Hotels extends Vue {
  selected: number = 20
  searchHotels: string = ''
  time: any = null
  params: IParams = {
    limit: 15,
    name: null,
    page: 0
  }

  created() {
    if (this.$route.query.search) {
      this.params.name = this.$route.query.search
      this.searchHotels = this.$route.query.search
    } 
    this.$store.dispatch('getHotels', this.params)
  }

  get hotels() {
    return this.$store.state.hotels.hotels
  }
  get meta() {
    return this.$store.state.hotels.meta
  }
  get loading() {
    return this.$store.state.hotels.loading
  }

  @Watch('searchHotels')
  search(val: string, oldVal: string) {
    if (this.time) {
      clearTimeout(this.time);
    }
    val == '' ? this.$router.push({path: '/'}) : this.$router.push({ query: { search: val }})
    this.params.page = 0
    this.params.name = val
    this.$store.dispatch('setLoading')
    this.time = setTimeout( () => {
      this.$store.dispatch('getHotels', this.params)
      }, 500);
  }
  setCountHotels() {
    this.params.page = 0
    this.$store.dispatch('getHotels', this.params)
  }
  setPageHotels(page: any) {
    this.params.page = page
    this.$store.dispatch('getHotels', this.params)
  }
}
</script>
<style scoped>

</style>
