<template>
  <span class="tag">
    {{text}}
  </span>
</template>

<script>
export default {
  props: {
    text: String
  }
}
</script>

<style lang='stylus' scoped>
.tag
  border-radius 27.5rem
  padding 10rem 27.5rem
  background #f3f7fa
  font-size 16rem

</style>