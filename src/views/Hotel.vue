<template>
  <div class="hotel">
    <h1>Учетная запись</h1>
    <div class="loading" v-if="loading">
      Загрузка...
    </div>
    <div v-if="error">
      {{ error }}
    </div>
    <div v-if="!loading && !error">
      <div>{{ hotel.hotel.common.main.title }}</div>
      <div>{{ hotel.hotel.common.main.description }}</div>
      <ul>
        <li v-for="room in hotel.hotel.rooms" :key="room.id">
          {{ room.name }}
        </li>
      </ul>
      <!-- <div v-if="!loading">
        <img :src="img.url" v-for="img in hotel.hotel.media.photo.slice(0, 4)">
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Hotels extends Vue {

  created() {
    this.$store.dispatch('getHotel', this.$route.params.id)
    this.$store.dispatch('setLoadingHotel')
    
  }
  get loading() {
    return this.$store.state.hotel.loading
  }
  get error() {
    return this.$store.state.hotel.error
  }
  get hotel() {
    return this.$store.state.hotel.hotel
  }

}

</script>
<style scoped>

</style>
