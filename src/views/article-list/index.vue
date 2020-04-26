<template>
  <div class="article-list-con">
    <div class="tags-con" ref="tags-con">
      <ul class="tags-list" :style="{'flex-wrap': showMoreTags ? 'wrap' : 'nowrap'}">
        <li
          class="tag-item"
          v-for="item in tags"
          :key="item.tagId"
          @click="handleTagClick(item.tagId)"
        >
          <tag :text="item.title" :class="{'active': tagId === item.tagId}"></tag>
        </li>
      </ul>
      <div v-if="hasTags" class="show-con" @click="handleToggleShow">
        <span v-if="!showMoreTags">+</span>
        <span v-else>-</span>
      </div>
      <div class="mask"></div>
    </div>

    <list :onPullingDown="refresh">
      <ul class="article-pre-list">
        <li class="article-pre-item" v-for="item in edges" :key="item.id">
          <!-- <router-link> -->
          <article-preview :article="item"></article-preview>
          <!-- </router-link>> -->
        </li>
      </ul>
    </list>
  </div>
</template>

<script>
import Tag from '../../components/tag'
import { query } from '../../api/home'
import List from '../../components/list'
import ArticlePreview from '../../components/article-preview'
import BScroll from 'better-scroll'

export default {
  props: {
    queryId: String,
    categoryId: String,
    sort: String,
    sortTags: {
      type: Array,
      default: () => []
    },
    hasTags: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Tag, List, ArticlePreview
  },
  data() {
    return {
      tags: this.sortTags || [],
      tagId: '',
      showMoreTags: false,
      edges: []
    }
  },
  created() {
    if (this.hasTags) {
      this.queryTag()
    }
    if (this.tags.length) {
      this.tagId = this.tags[0].tagId
    }
    this.refresh()
  },
  mounted() {
    this.$tagsCon = this.$refs['tags-con']
    console.log(this.$tagsCon.clientWidth)
    this.initSroll()
  },
  methods: {
    initSroll() {
      this.scroll = new BScroll(this.$tagsCon, {
        click: true,
        scrollX: true,
        scrollY: false
      })
    },
    async queryTag() {
      const data = {
        variables: { category: this.categoryId, limit: 15 },
        extensions: { query: { id: '801e22bdc908798e1c828ba6b71a9fd9' } }
      }
      let result = await query(data)
      this.tags = [{
        tagId: '',
        title: '全部'
      }]
      this.tags.push(...result.data.data.tagNav.items)
      this.tagId = this.tags[0].tagId
    },
    handleTagClick(tagId) {
      this.tagId = tagId
      this.refresh()
    },
    handleToggleShow() {
      this.showMoreTags = !this.showMoreTags
    },
    async refresh() {
      await this.query()
    },
    async query() {
      let data = await query(this.assembleQueryData())
      let items = data.data.data.articleFeed.items
      this.edges = []
      items.edges.forEach(e => {
        this.edges.push(e.node)
      })
      console.log(items)
    },
    assembleQueryData() {
      const data = {
        variables: { first: 20, after: '', order: 'POPULAR' },
        extensions: { query: { id: this.queryId } }
      }
      data.variables.category = this.categoryId
      if (this.tagId) {
        if (this.categoryId) {
          data.variables.tags = [this.tagId]
        } else {
          data.variables.order = this.tagId
        }
      }
      return data
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../assets/css/common.styl'

.article-list-con
  display flex
  flex-direction column
  height 100%

  .tags-con
    position relative
    background-color #fff
    overflow hidden
    display flex

    .tags-list
      display flex
      padding 0 20rem
      margin-right 45rem
      overflow-x scroll

      &::-webkit-scrollbar
        display none

      .tag-item
        white-space nowrap
        height 80rem
        line-height 80rem
        color $text-color
        margin-right 20rem

        .active
          color #fff
          background $primary-color

    .show-con
      position absolute
      display flex
      align-items center
      justify-content center
      font-size 40rem
      background-color #3399FE
      border-radius 5px
      right 0
      top 16rem
      width 40rem

.article-pre-item
  margin-bottom 20rem
</style>