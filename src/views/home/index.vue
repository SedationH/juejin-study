<template>
  <header class="header con">
    <div class="header-top">
      <div class="search-con">
        <search-box @focus="handleFocus" />
      </div>
      <div class="tag-setting-con">
        <i class="iconfont icon-shezhi"></i>
        <span>设置</span>
      </div>
    </div>
  </header>
</template>

<script>
import SearchBox from "../../components/search-box";
export default {
  components: {
    SearchBox
  },
  methods: {
    handleFocus(e) {
      e.target.blur();
      console.log(e)
      this.$router.push("/search");
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../assets/css/common.styl'

.header
  height 148rem
  background-color $primary-color

  .header-top
    display flex
    height 75rem
    padding-top 15rem

    .search-con
      flex-grow 1

    .tag-setting-con
      flex 0 0 120rem
      display flex
      align-items center
      justify-content space-around
      padding-left 20rem
      font-size 30rem
      color #fff

      .iconfont
        font-size 30rem
</style>