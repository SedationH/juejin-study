<template>
  <div class="list-con" ref="list-con">
    <div class="list-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
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
    refreshing: {
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

      if(typeof this.onPullingDown === 'function'){
        this.scroll.on('pullingDown',async () => {
          this.onPullingDown()
        })
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.list-con
  position relative
  height 100%
  overflow hidden
</style>