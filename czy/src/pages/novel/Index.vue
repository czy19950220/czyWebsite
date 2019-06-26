<template>
  <div>
    <br>
    <br>
    <br>
    <br>
    <br>

  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    components: {
      swiper,
      swiperSlide
    },
    name: "index",
    data() {
      return {
        swiperOption: { //轮播
          direction: 'horizontal',
          slidesPerView: 'auto',
          freeMode: true,
          scrollbar: {
            el: '.swiper-scrollbar'
          },
          mousewheel: true
        }

      }
    },
    created() {

    }
  }
</script>

<style scoped>

</style>
