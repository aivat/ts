<template>
  <div class="hotel">
    <h1>Учетная запись</h1>
    <div class="loading" v-if="loading">
      Загрузка...
    </div>
    <div v-if="error">
      {{ error }}
    </div>
    <div class="hotel-desc" v-if="!loading && !error">
      <div>{{ hotel.hotel.common.main.title }}</div>
      <div v-html="hotel.hotel.common.main.description"></div>
      <div>Номера:</div>
      <ul>
        <li v-for="room in hotel.hotel.rooms" :key="room.id">
          {{ room.name }}
        </li>
      </ul>
      <!-- <div v-if="!loading">
        <img :src="img.url" v-for="img in hotel.hotel.media.photo.slice(0, 4)">
      </div> -->
       <div class="image-wrap" v-if="!loading && !error">
        <gallery :images="images" :index="index" @close="index = null"></gallery>
        <div
        class="image"
        v-for="(image, imageIndex) in images"
        :key="imageIndex"
        @click="index = imageIndex"
        :style="{ backgroundImage: 'url(' + image + ')' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
// @ts-ignore
import  gallery from 'vue-gallery';

@Component({
  components: {
    gallery
  }
})
export default class Hotels extends Vue {
  index: any = null
  created() {
    this.$store.dispatch('getHotel', this.$route.params.id)
    this.$store.dispatch('setLoadingHotel')
    
  }
  get images() {
    let img = this.$store.state.hotel.hotel.hotel.media.photo.slice(0, 4)
    return img.map(function(item:any) { 
       return item.url 
      })   
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
.hotel {
  margin-top: 40px;
}
.hotel-desc {
  background-color: #fff;
  padding: 20px 30px 20px 20px;
}
.image-wrap {
  margin-top: 20px;
   display: flex;
  flex-wrap: wrap;
}
.image {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid #ebebeb;
  margin: 5px;
  width: 300px;
  height: 200px;
}
</style>
