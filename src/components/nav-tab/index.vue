<template>
  <div class="nav-tab">
    <div class="nav-content">
      <ul class="nav-list">
        <li class="nav-item" ref="nav-item" v-for="(item) in navList" :key="item.path">
          <router-link :to="item.path">
            <span class="text">{{item.text}}</span>
          </router-link>
        </li>
      </ul>
      <div class="bottom-line"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    navList: Array
  }

};
</script>

<style lang='stylus' scoped>
.nav-tab
  background transparent
  overflow-x scroll

  &::-webkit-scrollbar
    display none

  .nav-content
    display flex
    align-items center

    .nav-list
      display flex
      white-space nowrap
      padding-top 15rem

      .nav-item
        flex 1
        padding 0 40rem
        font-size 30rem
</style>