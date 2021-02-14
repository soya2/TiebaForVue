<template>
  <div>
    <meta name="referrer" content="no-referrer" />
    <div v-loading="loading">
      <el-card class="card-class" v-for="(item, index) in pageContent" :key="index">
        <div slot="header" class="card-header">
          <div class="nameAndTitle">
            <div class="header-author poster" v-if="item.Author === pageAuthor">{{ item.Author }}</div>
            <div class="header-author" v-else>{{ item.Author }}</div>
            <div class="header-title" v-if="index === 0">{{ pageTitle }}</div>
          </div>
          <div>{{ '#' + (index+1) }}</div>
        </div>
        <div v-html="item.Text"></div>
        <div class="card-time">{{ item.Time }}</div>
        <!-- <div>{{ item.FloorInFloor }}</div> -->
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageId: this.$route.params.id,
      pageContent: {},
      pageAuthor: '',
      loading : true
    }
  },
  created () {
    this.getPageContent(this.pageId)
  },
  methods: {
    getPageContent (id) {
      const res = this.$http.get(`getinner/${id}`)
      res.then(res => {
        this.pageContent = res.data
        this.pageAuthor = this.pageContent[0].Author
        if(this.pageContent.length != 0) this.loading = false
        if(res.status !== 200) return this.$message.error('获取帖子信息失败')
      })
    },
  },
  computed: {
    pageTitle () {
      return this.$store.state.pageTitle
    }
  }
}
</script>

<style lang="less" scoped>
.card-class {
  margin-top: 10px;
  .card-header {
    display: flex;
    justify-content: space-between;
    .nameAndTitle {
      display: flex;
      .header-author {
        font-size: 16px;
        font-weight: bold;
      }
      .header-title {
        font-size: 20px;
        font-weight: bold;
        margin-left: 24px;
      }
      .poster {
        background-color: rgb(183, 215, 228);
        border-radius: 6px;
        padding: 4px 8px;
      }
    }
  }
  .card-time {
    text-align: right;
    color: darkgrey;
  }
}
</style>
