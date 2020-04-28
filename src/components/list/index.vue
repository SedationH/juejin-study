<template>
  <div class="list-con" ref="list-con">
    <div class="list-content">
      <slot></slot>
    </div>
    <div class="refresh-con">
      <refresh v-if="isRefresh"></refresh>
    </div>
    <div class="loading-con">
      <loading v-if="isLoading"></loading>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Refresh from '../refresh'
import Loading from '../loading'

export default {
  components: {
    Refresh, Loading
  },
  props: {
    click: {
      type: Boolean,
      default: true
    },
    pullUpLoad: {
      type: Object,
      default: () => ({ threshold: 50 })
    },
    pullDownRefresh: {
      type: Object,
      default: () => ({
        threshold: 50,
        stop: 20
      })
    },
    probeType: {
      type: Number,
      default: 1
    },
    isRefresh: {
      type: Boolean,
      default: false
    },
    onPullingUp: Function,
    onPullingDown: Function,
    onScroll: Function,
  },
  mounted() {
    this.initBScroll()
  },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    initBScroll() {
      this.scroll = new BScroll(
        this.$refs['list-con'],
        {
          click: true,
          pullUpLoad: this.pullUpLoad || {},
          pullDownRefresh: this.pullDownRefresh || {},
          probeType: this.probeType
        }
      )
      // refresh
      if (typeof this.onPullingDown === 'function') {
        this.scroll.on('pullingDown', async () => {
          this.refreshing = true
          this.onPullingDown()
            .then(() => {
              this.scroll.finishPullDown()
            })
        })
      }
      // more
      this.scroll.on('pullingUp', async () => {
        this.isLoading = true
        this.onPullingUp()
          .then(() => {
            this.isLoading = false
            this.scroll.finishPullUp()
          })
      })
    }
  }
}
</script>

<style lang='stylus' scoped>
.list-con
  position relative
  height 100%
  overflow hidden

  .refresh-con
    width 80rem
    height 80rem
    position absolute
    top 50rem
    left 50%
    transform translateX(-50%)

  .loading-con
    width 80rem
    height 80rem
    width 100%
    display flex
    justify-content center
    background-color pink
</style>