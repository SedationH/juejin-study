<template>
  <div class="list-con">
    <div class="list-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='stylus' scoped>
.list-con
  position relative
  height 100%
  overflow hidden
</style>