<template>
  <div class="hello">
    <h1>Учетная запись</h1>
    <div class="loading" v-if="loading">
      Загрузка...
    </div>
  {{hotel}}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

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
    this.$store.dispatch('setLoadingHotel')
    this.$store.dispatch('getHotel', this.$route.params.id)
  }
  get loading() {
    return this.$store.state.hotel.loading
  }
  get hotel() {
    return this.$store.state.hotel.hotel
  }

}

interface IParams {
    limit: number;
    name: any;
    page: number;
}
</script>
<style scoped>

</style>
