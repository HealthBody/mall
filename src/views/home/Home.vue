<template>
  <div id="home">
    <!-- 导航栏插件 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      class="tab-control1"
      :title="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
      ></tab-control>
    <!-- better-scroll 滑动组件的使用 -->
    <BScroll class="content" 
    ref="scroll" 
    :probe-type="3" 
    @scroll="positionY"
    :pull-up-load="true"
    @pullingUp="loadMore">
      
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommends :recommends="recommends"></home-recommends>
      <feature-views></feature-views>

      <tab-control
      class="tab-control"
      :title="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl2"
      ></tab-control>

      <goods-list :goods="showGoods"
      ></goods-list>

    </BScroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
// 引用导航栏插件模块
import NavBar from 'components/common/navbar/NavBar'
// 引用滑动组件模块
import BScroll from 'components/common/scroll/BScroll'
import BackTop from 'components/content/backtop/BackTop'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import HomeSwiper from './childHome/HomeSwiper'
import HomeRecommends from './childHome/HomeRecommends'
import FeatureViews from './childHome/FeatureViews'

import {getHomeMultidata, getHomeGoods} from 'network/home.js'

import {debounce} from 'common/utils.js'
import {backTopMixin} from 'common/mixin.js'

  export default {
    name:'Home',
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommends,
      FeatureViews,
      TabControl,
      GoodsList,
      BScroll,
      BackTop
    },
    mixins: [backTopMixin],
    data() {
      return{
        banners: [],
        recommends: [],
        goods:{
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        // isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    activated() {
      let y = this.saveY
      this.$refs.scroll.scrollTo(0, y);
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()

      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    created() {
      this.getHomeMultidata()

      // 加载不同类型商品的数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
      
    },
    mounted () {
      this.tabClick(0)
      const refresh = debounce(this.$refs.scroll.refresh,50)
      this.$bus.$on('itemImageLoad', () =>{
        refresh()
      })
    },
    
    methods: {
      swiperImageLoad() {

        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      
      // 选择加载哪种类型的数据
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      // 判断滑动位置
      positionY(position) {
        // this.isShowBackTop = (-position.y) > 1000,
        this.listenShowBackTop(position);
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      // 返回最顶层
      // backTop() {
      //   this.$refs.scroll.scrollTo(0,0)
      // },

      // 滑到底部加载更多商品
      loadMore () {
        this.getHomeGoods(this.currentType)
      },


      // 从服务器接收数据
      getHomeMultidata() {
        getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()      
        })
      }
    },
    computed: {
      // 选择展示哪一类商品
      showGoods() {
        return this.goods[this.currentType].list
      }
    }
}
</script>
<style scoped>
#home {
  height: 100px;
  
}

.home-nav{
  
  color:#fff;
  background-color: rgba(253, 125, 149);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9;
}

/* .tab-control{
  position: sticky;
  top:44px;
  z-index: 9;
} */
.tab-control1{
  position: relative;
  top: 44px;
  z-index: 9;
}
.content{
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>