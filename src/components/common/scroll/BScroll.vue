<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import bscroll from 'better-scroll'

export default {
  name:'BScroll',

  props: {
    probeType: {
      type: Number,
      default() {
        return 0
      }
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted () {
    // 1 创建scroll对象
    this.scroll = new bscroll(this.$refs.wrapper, {
      click:true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    }),
    // 2 监听滚动的位置
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    }),
    // 3 监听是否滚动到底部
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo(x, y, time=500) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
      console.log('shuaxin')
    },
    getScrollY() {
      return this.scroll.y ? this.scroll.y : 0
    }
  }
}
</script>
<style scoped>
</style>