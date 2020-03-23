<template>
    <swiper class="space" v-if="swiperImages.length">
      <swiper-item v-for="item in swiperImages" :key="item" >
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>
<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name:'Detailswiper',
  props: {
    swiperImages: {
      type:Array,
      default() {
        return []
      }
    }
  },
  components: {
    SwiperItem,
    Swiper
  }
}
</script>
<style scoped>
.space{
  height: 300px;
}
</style>