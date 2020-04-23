<template>
  <div class="nav-tab">
    <div class="nav-content">
      <ul class="nav-list">
        <li
          class="nav-item"
          ref="nav-item"
          v-for="(item, i) in navList"
          :key="item.path"
          @click="handleClick(i)"
        >
          <router-link :to="item.path">
            <span class="text">{{item.text}}</span>
          </router-link>
        </li>
      </ul>
      <div
        class="bottom-line"
        :style="{width: `${lineWidth}px`, transform: `translateX(${lineLeft}px)`}"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    navList: Array
  },
  data() {
    return {
      lineLeft: 0,
      lineWidth: 0,
      arr: []
    }
  },
  mounted() {
    let items = this.$refs['nav-item']
    let arr = []
    items.forEach((item, i) => {
      if (i === 0) {
        arr.push({
          left: 0,
          width: item.clientWidth
        })
      } else {
        arr.push({
          left: arr[i - 1].left + arr[i - 1].width,
          width: item.clientWidth
        })
      }
    })
    console.log(arr)
    this.arr = arr
    this.handleClick(0)
  },
  methods: {
    handleClick(i) {
      this.lineLeft = this.arr[i].left
      this.lineWidth = this.arr[i].width
    }
  }
};
</script>

<style lang='stylus' scoped>
.nav-tab
  background transparent
  overflow-x scroll
  height 100%

  &::-webkit-scrollbar
    display none

  .nav-content
    display flex
    position relative
    height 100%

    .nav-list
      display flex
      align-items center
      white-space nowrap

      .nav-item
        flex 1
        padding 0 40rem
        font-size 30rem

        .router-link-active
          color #fff

    .bottom-line
      position absolute
      border-radius 2rem
      bottom 0
      height 8rem
      background #fff
      transition all 100ms
</style>