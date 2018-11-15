<template>
  <div class="hotels">
    <nav class="hotels-nav">
      <div class="hotels-nav-btn" v-if="params.page > 0" v-on:click="setPageHotels(params.page - 1)">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="48px" height="48px" viewBox="1 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
          <path d="M15.41,16.59L10.83,12l4.58-4.59L14,6l-6,6l6,6L15.41,16.59z"/>
          <path fill="none" d="M0,0h24v24H0V0z"/>
        </svg>
      </div>
      <div v-else class="hotels-nav-btn hotels-nav-btn-disabled">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="48px" height="48px" viewBox="1 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
          <path d="M15.41,16.59L10.83,12l4.58-4.59L14,6l-6,6l6,6L15.41,16.59z"/>
          <path fill="none" d="M0,0h24v24H0V0z"/>
        </svg>
      </div>
      <div class="hotels-nav-page">{{ params.page }} / {{ meta.totalPages }}</div>
      <div class="hotels-nav-btn" v-if="params.page < meta.totalPages" v-on:click="setPageHotels(params.page + 1)">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="48px" height="48px" viewBox="-1 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
          <path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"/>
          <path fill="none" d="M0,0h24v24H0V0z"/>
        </svg>   
      </div>
      <div v-else class="hotels-nav-btn hotels-nav-btn-disabled">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="48px" height="48px" viewBox="-1 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
          <path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"/>
          <path fill="none" d="M0,0h24v24H0V0z"/>
        </svg>  
      </div>
    </nav>
    <div class="container">
      <div class="hotels-wrap">
        <div class="hotels-title">
          <h1 class="hotels-title-h1">Учетки</h1>
          <div class="hotels-title-desc">{{ meta.count }} учеток</div>
        </div>
        <div class="select-wrap">
          <label>Количество записей на странице</label>
          <select class="select" v-on:change="setCountHotels" v-model.number.lazy="params.limit">
            <option disabled value="">Количество записей на странице</option>
            <option class="select-option">5</option>
            <option class="select-option">10</option>
            <option class="select-option">15</option>
            <option class="select-option">20</option>
          </select>
        </div>
        <input class="search" v-model="searchHotels" placeholder="Введите название медицинской">
        <div class="loading" v-if="loading">
          <div>Загрузка...</div>
        </div>
        <div class="hotels-list">
          <ul v-if="hotels">
            <li class="hotels-item" v-for="hotel in hotels" :key="hotel.id">
              <router-link :to="{ name: 'hotel', params: { id: hotel.id }}">{{ hotel.name }}</router-link>
              <div>{{ hotel.stars }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

interface IParams {
    limit: number;
    name: string;
    page: number;
}

@Component
export default class Hotels extends Vue {
  selected: number = 20
  searchHotels: string = ''
  time: any = null
  params: IParams = {
    limit: 15,
    name: '',
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
.hotels {
  display: flex;
  flex-direction: column;
  background-color: rgb(242, 245, 248);
  margin-top: 40px;
  
}
.container {
  width: 100%; 
}
.hotels-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.hotels-nav {
  display: flex;
  width: 100%;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,.1);
  position: sticky;
  top: 40px;
  padding: 7px 0;
}
.hotels-nav-page {
  display: flex;
  align-items: center;
  padding: 0 10px;
}
.hotels-nav-btn {
  display: block;
  width: 48px;
  height: 48px;
  color: #4285f4;
  border-radius: 50%;
  background-color: rgba(66,133,244,.15);
  transition: all .15s ease-out;
  cursor: pointer;
}
.hotels-nav-btn:hover {
  color: #fff;
  background-color: #4285f4;
}
.hotels-nav-btn-disabled {
   color: #ccc;
}
.hotels-nav-btn-disabled:hover {
   color: #ccc;
   background-color: rgba(66,133,244,.15);
}
.hotels-nav-btn>svg {
  fill: currentColor;
}
.hotels-title {
  display: flex;
  padding: 20px 0;
  align-items: baseline;
}
.hotels-title-h1 {
  font-size: 24px;
  margin: 0;
}
.hotels-title-desc {
  padding-left: 7px;

}
.select-wrap {
  margin: 10px 0;
}
.select {
  border-radius: 2px;
}

.search {
  outline: 0;
  border-radius: 4px;
  border: 0;
  font-size: 16px;
  font-weight: 500;
  height: 44px;
  padding-left: 20px;
  color: #222;
  border: 1px solid transparent;
}
.hotels-list {
  margin: 25px 0;
  box-shadow: 0 1px 2px rgba(0,0,0,.1);
}
.hotels-list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.hotels-item {
  background-color: #fff;
  padding: 20px 30px 20px 20px;
  border-bottom: 1px solid #eee;
  line-height: 20px;
}
.loading {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 1200px) {
  .hotels {
    justify-content: center;
    align-items: center
  }
  .container {
    width: 1200px; 
  }
  .select {
    margin-left: 7px;
  }
  .loading {
    height: 680px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
