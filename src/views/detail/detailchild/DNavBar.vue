<template>
  <div>
    <nav-bar>
      <div slot="left" @click="backClick" class="backImg">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in title" :key="item.id" 
        @click="titleClick(index)"
        :class="{active: index == currentindex}"
        class="titleitem"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name:'DNavBar',
  components: {
    NavBar
  },
  data() {
    return {
      title:['商品','参数','评论','推荐'],
      currentindex: 0
    }
  },
  methods: {
    titleClick(index) {
      this.currentindex = index
      this.$emit('titleClick',index)
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.title{
  display: flex;
  font-size: 14px;
}
.title .titleitem{
  
  flex:1
}
.active {
  color: rgba(253, 125, 149);
}
.backImg img{
  margin-top: 12px;
}
</style>