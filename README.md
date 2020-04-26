# study-vue-juejin

## api相关

磕磕绊绊终于把api调成了，📝下相关的逻辑



一个是tab栏，一个是tag，两个在切换的时候都会产生网络请求重新拉取文章



有生命周期函数created

```js
created() {
  if (this.hasTags) {
    this.queryTag()
  }
  if (this.tags.length) {
    this.tagId = this.tags[0].tagId
  }
  this.refresh()
},
```



推荐和热榜是没有tag的，热榜的几个tag都是提前写好的，注意看api，打开dev查看网络是一种很好的方式



在除了推荐和热榜之外，别的tab都会有两次请求

![image-20200426160701464](http://picbed.sedationh.cn/image-20200426160701464.png)



tag的重新请求是因为有点击事件

```javascript
handleTagClick(tagId) {
  this.tagId = tagId
  this.refresh()
},
```



而tab切换则是直接重新渲染整个article-list，因为外层

![image-20200426160744528](/Users/sedationh/Library/Application Support/typora-user-images/image-20200426160744528.png)



接着肝滑动相关问题