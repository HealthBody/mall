<template>
  <div>
    <div id="tab-bar">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name:'TabBar'
  }
</script>
<style scoped>


  #tab-bar{
    height: 49px;
    background-color: #f6f6f6;
    border-top:1px solid #eee;
    box-shadow: 0px -1px 1px rgba(100, 100,100, .1);

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0; 

    
    display: flex;
    text-align: center;
  }
</style>