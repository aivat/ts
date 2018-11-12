<template>
  <div class="hello">
    <h1>Учетная запись</h1>

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
<style scoped>

</style>
