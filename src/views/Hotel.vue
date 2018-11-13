<template>
  <div class="hello">
    <h1>Учетная запись</h1>
    <div class="loading" v-if="loading">
      Загрузка...
    </div>
    <!-- <div>{{ hotel }}</div> -->
    <div v-if="!loading">{{ hotel.hotel.common.main.title }}</div>
    <div v-if="!loading">{{ hotel.hotel.common.main.description }}</div>
    <ul v-if="!loading">
      <li v-for="room in hotel.hotel.rooms">
        {{ room.name }}
      </li>
    </ul>
    <!-- <div v-if="!loading">
      <img :src="img.url" v-for="img in hotel.hotel.media.photo.slice(0, 4)">
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Hotels extends Vue {

  created() {
   // this.$store.dispatch('setLoadingHotel')
    this.$store.dispatch('getHotel', this.$route.params.id)
  }
  get loading() {
    return this.$store.state.hotel.loading
  }
  get hotel() {
    return this.$store.state.hotel.hotel
  }

}

</script>
<style scoped>

</style>
