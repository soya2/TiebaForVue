<template>
  <div id="app">
    <el-container>
    <el-header>
      <div class="top-banner">
        <li v-for="(item, index) in titleElement" :key="index" @click="jumpToPage(item.path)">
          <div class="title">{{ item.name }}</div>
        </li>
        <div class="banner-block" ref="bannerBlock"><div class="block-text">{{ this.$store.state.pageTitle}}</div></div>
      </div>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="12" :offset="6">
          <router-view></router-view>
        </el-col>
        <el-backtop><div style="padding-bottom: 4px; font-size: 16px">▲</div></el-backtop>
      </el-row>
    </el-main>
  </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      titleElement: [
        { name: `${this.$store.state.tiebaName}吧`, path: '/' },
        { name: '搜 索', path: '/search' },
        { name: '精 品', path: '/boutique' },
        { name: '个 人', path: '/personal' }
      ],
      scrollTop: 0
    }
  },
  watch: {
    scrollTop: function(olddata, newdata) {
      if(/^\/page\/\d{1,}$/.test(this.$route.path) === true) {
        if (newdata - olddata < 0) {
          this.$refs.bannerBlock.style.transition = 'height .6s'
          this.$refs.bannerBlock.style.height = '100%'
        }
        else {
          this.$refs.bannerBlock.style.transition = 'height .6s'
          this.$refs.bannerBlock.style.height = '0'
        }
      }
      else {
        this.$refs.bannerBlock.style.height = '0'
      }
    }
  },
  methods: {
    jumpToPage (paths) {
      this.$router.push({
        path: paths
      })
    },
    handleScroll () {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll) // 离开该页面需要移除这个监听的事件，不然会报错
  },
  name: 'App',
}
</script>

<style lang="less" scoped>
.top-banner {
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 2;
  background-color: #fff;
  box-shadow: 0 4px 16px rgb(231, 231, 231);
  justify-content: center;
  overflow: hidden;
  .title {
    cursor: pointer;
    border-radius: 20px;
    padding: 10px 10px;
    margin: 10px 50px 10px 50px;
    font-family: 'Microsoft Yahei', Courier, monospace;
    font-weight: bold;
    font-size: 20px;
    &:hover{
      transition-duration: .4s;
      background-color: rgb(218, 244, 255);
    }
  }
  .banner-block {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
    background-color: #fff;
    padding-left: 27%;
    .block-text {
      padding-top: 12px;
      font-size: 28px;
      font-weight: bold;
    }
  }
}
</style>
