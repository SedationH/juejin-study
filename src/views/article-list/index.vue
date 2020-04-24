<template>
  <div class="article-list-con">
    <div class="tags-con">
      <ul class="tags-list">
        <li class="tag-item" v-for="item in tags" :key="item.tagId">
          <tag :text="item.title"></tag>
        </li>
      </ul>
      <div class="show-con"></div>
      <div class="mask"></div>
    </div>

    <div class="list"></div>

    <div class="icon-add-con">
      <i class="iconfont icon-Add"></i>
    </div>
  </div>
</template>

<script>
import Tag from '../../components/tag'
import { query } from '../../api/home'

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
    Tag
  },
  data() {
    return {
      tags: this.sortTags || [],
      tagId: ''
    }
  },
  created() {
    if (this.hasTags) {
      this.queryTag()
    }
    if (this.tags.length) {
      this.tagId = this.tags[0].tagId
    }
  },
  methods: {
    // queryTag() {
    //   const data = {
    //     operationName: "",
    //     query: "",
    //     variables: { category: this.categoryId, limit: 15 },
    //     extensions: { query: { id: "801e22bdc908798e1c828ba6b71a9fd9" } }
    //   }
    //   this.tags = [{
    //     tagId: '',
    //     title: '全部'
    //   }]
    //   this.tagId = this.tags[0].tagId
    //   new Promise(resolve => {
    //     resolve(query(data))
    //   })
    //     .then(
    //       res => {
    //         this.tags.push(...res.data.data.tagNav.items)
    //         return res
    //       }
    //     )
    // }

    async queryTag() {
      const data = {
        operationName: "",
        query: "",
        variables: { category: this.categoryId, limit: 15 },
        extensions: { query: { id: "801e22bdc908798e1c828ba6b71a9fd9" } }
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
    }
  }
};
</script>

<style lang="stylus" scoped></style>