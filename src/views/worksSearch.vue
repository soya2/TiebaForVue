<template>
  <div>
    <div style="display: flex; margin-top: 20px;">
      <el-input v-model="worksName" placeholder="请输入作品名字" size="large" class="input"></el-input>
      <el-button type="primary" size="small" class="confirm-btn" @click="GetSearchMessage(worksName)">提交</el-button>
    </div>
    <el-card v-for="(item, index) in searchList" :key="index" class="search-card">
      <div style="display: flex;" v-loading="searchloading">
        <img :src="item.images.small" v-if="item.images !== null"/>
        <div style="margin-left: 10px;">
          <div style="font-size: 12px; color: darkgrey">{{ item.name }}</div>
          <div class="name-cn" @click="jumpToCharts(item.id)">{{ item.name_cn }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      worksName: '',
      searchloading: false,
      searchList: []
    }
  },
  methods: {
    async GetSearchMessage (keyword) {
      if(keyword.length === 0) return this.$message.error('请输入关键字')
      this.searchloading = true
      const res = await this.$http.get(`/getsearch/${keyword}`)
      this.searchList = res.data.list
      this.searchloading = false
    },
    jumpToCharts (id) {
      this.$router.push({
        path: `/wiki/${id}`
      })
    }
  }
}
</script>

<style lang="less" scoped>
.input {
  margin-right: 10px;
}
.search-card {
  display: flex;
  margin-top: 12px;
  .name-cn {
    font-size: 18px;
    font-weight: bold;
    &:hover {
      cursor: pointer;
      color: rgb(78, 152, 184);
    }
  }
}
</style>
