<template>
  <div>
    <el-table
    @cell-click="jumpToPage"
    :data="pageData[pageNumber]"
    v-loading="loading"
    stripe
    style="width: 100%">
      <el-table-column prop="Reply" label="回复" width="60%" align="center"></el-table-column>
      <el-table-column label="标题" width="440%">
        <template slot-scope="scope"><div class="title-point">{{ scope.row.Title }}</div></template>
      </el-table-column>
      <el-table-column prop="Author" label="作者" width="140%"></el-table-column>
      <el-table-column prop="Time" label="回复时间"></el-table-column>
    </el-table>
    <div class="pagin">
      <el-pagination
      @current-change="handleCurrentEvent"
      :page-size="100"
      :pager-count="7"
      :current-page="pageNumber"
      layout="prev, pager, next"
      :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageData: {},
      pageNumber: 1,
      loading: true
    }
  },
  created () {
    this.getPageData(1)
  },
  methods: {
    getPageData (startPage) {
      const res = this.$http.get(`getpage/${this.$store.state.tiebaName}/${startPage}/${startPage + 1}`)
      res.then(res => {
        this.pageData = res.data.Page[0]
        if(this.pageData.length != 0) this.loading = false
        if(res.status !== 200) return this.$message.error('获取数据错误')
      })
    },
    handleCurrentEvent(val) {
      this.pageNumber = val
      this.getPageData(val)
    },
    jumpToPage (row, col) {
      if(col.label == '标题'){
        this.$store.state.pageTitle = row.Title
        this.$router.push({
          path: `/page/${row.Id}`
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pagin {
  display: flex;
  justify-content: center;
}
.title-point{
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  color: rgb(37, 37, 37);
}
</style>
