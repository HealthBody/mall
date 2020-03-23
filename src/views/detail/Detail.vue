<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick"/>
    <scroll ref="scroll" class="content"
    :probe-type="3"
    @scroll="contentScroll">
      <detail-swiper :swiperImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="detailImageLoad" />
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
import DetailNavBar from './detailchild/DNavBar'
import DetailSwiper from './detailchild/Deatilswiper'
import DetailBaseInfo from './detailchild/DetailBaseInfo'
import DetailShopInfo from './detailchild/DetailShopInfo'
import DetailGoodsInfo from './detailchild/DetailGoodsInfo'
import DetailParamInfo from './detailchild/DetailParamInfo'
import DetailCommentInfo from './detailchild/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'
import DetailBottomBar from './detailchild/DetailBottomBar'

import Scroll from "components/common/scroll/BScroll"

import {debounce} from 'common/utils.js'
import {getDetailData, Goods, Shop, GoodsParam, getDetailRecommend} from 'network/detail.js'
import {itemListenerMixin, backTopMixin} from "common/mixin.js";

export default {
  name:'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs:[],
      getThemeTopY: null,
      currentIndex: 0,
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailBottomBar,
    DetailCommentInfo,
    Scroll,
    GoodsList
  },
  mixins: [itemListenerMixin, backTopMixin],
  created () {
    this.iid = this.$route.params.iid

    getDetailData(this.iid).then(res => {
      console.log(res)
      const data = res.result
      // 获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages
      // 商品数据
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 商家信息
      this.shop = new Shop(data.shopInfo)
      // 产品穿着展示信息
      this.detailInfo = data.detailInfo
      // 产品详细参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 评论信息
      if(data.rate.list != 0) {
        this.commentInfo = data.rate.list[0]
      }

    })
    getDetailRecommend().then(res => {
      this.recommends = res.data.list
    })
  
        // 给getThemeTopY 赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_SAFE_INTEGER);
  
      // console.log(this.themeTopYs);
    }, 100)
  },
  methods: {
      detailImageLoad() {
        // this.$refs.scroll.refresh()
        this.newRefresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
      },
      contentScroll(position) {
        //1.获取y值
        const positionY = -position.y;
        //2.将positionY的值和主题中的值进行对比
        let length = this.themeTopYs.length;
        // for(let i = 0; i < length; i++){
        //   if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >=  this.themeTopYs[i]))){
        //     this.currentIndex = i;
        //     this.$refs.nav.currentIndex = this.currentIndex;
        //   }
        // }
        for(let i = 0; i < length - 1; i++){
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])){
            this.currentIndex = i;
            this.$refs.nav.currentindex = this.currentIndex;
            // console.log(this.currentIndex)
          }
        }
        this.listenShowBackTop(position);
      },
      addToCart() {
        // 1 获取购物车所需要展示的信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        console.log(this.goods)
        // 2 将商品添加到购物车里面
        // this.$store.cartList.push(product)
        // this.$store.commit('addCart', product)
        this.$store.dispatch('addCart' , product).then(res => {
          this.$toast.show(res, 1000)
        })
      }
  },
  destoyed(){
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
}
</script>
<style scoped>
  #detail {
    position: relative;
    top: 44px;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }
</style>