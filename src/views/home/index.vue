<template>
  <div class="home">
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
        <div class="header-bottom">
          <div class="nav-tab-con">
            <nav-tab :navList="navList"></nav-tab>
          </div>
          <div class="triangle-con">
            <div class="triangle"></div>
          </div>
        </div>
      </header>
      <section class="main">
        <router-view :key="$route.path"></router-view>
      </section>
  </div>
</template>

<script>
import SearchBox from "../../components/search-box"
import NavTab from '../../components/nav-tab'
import { homePathText } from '../../router/home'

export default {
  components: {
    SearchBox,
    NavTab
  },
  data() {
    return {
      navList: homePathText
    }
  },
  methods: {
    handleFocus(e) {
      console.log(e)
      this.$router.push("/search")
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../assets/css/common.styl'
.home
  height 100%
  position relative

.header
  height 148rem
  background-color $primary-color

  .header-top
    display flex
    height 75rem
    padding-top 15rem

    .search-con
      flex 1

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

  .header-bottom
    display flex
    height 73rem

    .nav-tab-con
      flex 1
      overflow hidden

    .triangle-con
      padding-left 30rem
      flex 0 0 30rem

      .triangle
        width 0
        height 0
        border 15rem solid transparent
        border-top 15rem solid #fff
        position relative
        right 14rem
        top 29rem
.main
  position absolute
  top 148rem
  bottom 0
  width 100%
</style>