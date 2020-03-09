<template>
  <div>
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommends :recommends="recommends"></home-recommends>
    
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import {getHomeMultidata} from 'network/home.js'
import HomeSwiper from './childHome/HomeSwiper'
import HomeRecommends from './childHome/HomeRecommends'

  export default{
    name:'Home',
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommends
    },
    data() {
      return{
        banners: [],
        recommends: []
      }
    },
    created() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        console.log(this.banners)
        this.recommends = res.data.recommend.list
      })
    }
  }
</script>
<style scoped>
.home-nav{
  color:#fff;
  background-color: rgba(253, 125, 149);
}
</style>