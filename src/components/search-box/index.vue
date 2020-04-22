<template>
  <div class="search-content con">
    <i class="iconfont icon-sousuo"></i>
    <input 
      @focus="handleFocus"
      type="text" class="search-input" placeholder="搜索文章、用户、标签" />
  </div>
</template>

<script>
export default {
  methods: {
    handleFocus(event) {
      this.focused = true
      this.$emit('focus',event)
    }
  }
};
</script>

<style lang="stylus" scoped>
.search-content
  display flex
  align-items center
  background #3399fe
  border-radius 10rem
  height 60rem

  .search-input
    flex 1
    border none
    height 100%
    padding 15rem
    background transparent
    color white
    outline none

    &::placeholder
      color #88ccfb
      font-size 25rem

  .iconfont
    flex 0 0 40rem
    font-size 35rem
</style>