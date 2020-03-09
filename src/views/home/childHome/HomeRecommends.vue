<template>
  <div id="recommends">
    <div class="recommend" v-for="item in recommends" :key="item.value">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
      <div>{{item.title}}</div>
      </div>
  </div>
</template>
<script>
  export default {
    name: 'HomeRecommends',
    props:{
      recommends:{
        type:Array,
        default() {
          return []
        }
      }
    }
  }
</script>
<style scoped>
#recommends{
  display: flex;
  height: 30px;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px 0;
}
.recommend{
  flex:1
}
.recommend img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
  border-bottom:1px solid #eee;
}
</style>