<template>
  <div class="hotel">
    <div class="container">
      <div class="hotel-wrap">
        <h1 v-if="!loading && !error">{{ hotel.hotel.common.main.title }}</h1>
        <div class="loading" v-if="loading">
          Загрузка...
        </div>
        <div class="error" v-if="error">
          {{ error }}
          <router-link to="/">Вернуться на главную</router-link>
        </div>
        <div class="hotel-desc" v-if="!loading && !error">
          <div v-html="hotel.hotel.common.main.description"></div>
          <div>Номера:</div>
          <ul>
            <li v-for="room in hotel.hotel.rooms" :key="room.id">
              {{ room.name }}
            </li>
          </ul>
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
  display: flex;
  flex-direction: column;
  background-color: rgb(242, 245, 248);
  margin-top: 40px;
}
.container {
  width: 100%; 
}
.hotel-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 5px;
}
.hotel-desc {
  background-color: #fff;
  padding: 20px 30px 20px 20px;
  margin-bottom: 25px;
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
.loading, .error {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}

@media (min-width: 1200px) {
  .hotel {
    justify-content: center;
    align-items: center
  }
  .container {
    width: 800px; 
  }
  .hotel-wrap {
    padding: 0;
  }
  .loading, .error {
    height: 680px;
  }
}
</style>
