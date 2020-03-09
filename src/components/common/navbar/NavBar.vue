<template>
  <div class="navbar">
    <div class="left" ><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>
<script>
module.exports = {
  name:'NavBar'
}
</script>
<style scoped>
.navbar{
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
}
.left,.right {
  width: 44px;
  /* background-color: red; */
}
.center{
  flex:1;
  /* background-color: paleturquoise; */
}
</style>