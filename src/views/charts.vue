<template>
  <div>
    <el-card>
      <div slot="header" class="title">
        <div style="padding: 6px 0 0 4px;">该作品是否合适讨论</div>
      </div>
      <div class="block-display" v-loading="loading">
        <div class="works-display">
          <img :src="works.img"/>
          <div class="works-text">
              <div class="works-name">{{ works.name }}</div>
              <div class="works-cnname">{{ works.cnName }}</div>
              <div class="works-status works-status-end" v-if="works.status == 0">已完结</div>
              <div class="works-status" v-else>连载中</div>
              <div class="works-staff"><strong>原作</strong>:&nbsp;{{ works.author }}</div>
              <div class="works-staff"><strong>导演</strong>:&nbsp;{{ works.director }}</div>
          </div>
        </div>
        <div ref="radarChart" style="height: 400px; width: 400px;"></div>
      </div>
      <el-collapse>
        <el-collapse-item title="调整指标" name="1">
          <div class="option-display">
            <div class="item-style" v-for="(item, i) in option.series[0].data[1].value" :key="i">
              <div style="margin: 6px 12px 0 0;">{{ option.radar[0].indicator[i].text }}</div>
              <el-slider v-model="option.series[0].data[1].value[i]" class="slider-item" @input="changeValue($event, i)"></el-slider>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  data () {
    return {
      worksId: this.$route.params.id,
      loading: false,
      chartObj: {},
      option: {
        title: {},
        legend: { data: ['论坛讨论基准','作品'] },
        radar: [
          {
            indicator: [
              { text: '指标一', max: 100 },
              { text: '指标二', max: 100 },
              { text: '指标三', max: 100 },
              { text: '指标四', max: 100 },
              { text: '指标五', max: 100 }
            ],
            center: ['50%', '50%'],
            radius: 120,
            startAngle: 90,
            splitNumber: 2,
            shape: 'circle',
            name: { textStyle: { color: '#72ACD1' } },
            splitArea: {
              areaStyle: {
                color: ['rgba(114, 172, 209, 0.2)','rgba(114, 172, 209, 0.4)'],
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                shadowBlur: 1
              }
            }
          }
        ],
        series: [
          {
            name: '是否适合讨论？',
            type: 'radar',
            emphasis: { lineStyle: { width: 4 } },
            data: [
              {
                name: '论坛讨论基准',
                value: [50, 80, 34, 100, 90],
              },
              {
                name: '作品',
                value: [0, 55.4, 33, 90, 15],
                areaStyle: { color: 'rgba(180, 180, 255, 0.5)' }
              }
            ]
          }
        ]
      },
      works: {
        img: '',
        name: '原名',
        cnName: '译名',
        status: 0,
        author: '',
        director: ''
      }
    }
  },
  mounted () {
    this.chartObj = this.createCharts(this.option)
    this.works.img = require('../assets/error-img.jpg')
    this.GetWorksDetail(this.worksId)
  },
  methods: {
    createCharts (option) {
      var chartObj = echarts.init(this.$refs.radarChart)
      chartObj.setOption(option);
      return chartObj
    },
    changeValue (newValue, index) {
      this.option.series[0].data[1].value[index] = newValue
      this.chartObj.setOption(this.option);
    },
    async GetWorksDetail (id) {
      this.loading = true
      const res = await this.$http.get(`/getworks/${id}`)
      if(res.status !== 200 || res.data == '404') {
        this.loading = false
        return this.$message.error('获取作品信息失败')
      }
      console.log(res.data)
      if(res.data.images !== null) this.works.img = res.data.images.large
      this.works.name = res.data.name
      this.works.cnName = res.data.name_cn
      if(res.data.staff !== null) {
        for(const item of res.data.staff) {
          if(item.jobs[0] == '原作') this.works.author = item.name
          if(item.jobs[0] == '导演') this.works.director = item.name
        }
      }
      if(res.data.eps !== null) {
        var len = res.data.eps.length
        if(res.data.eps[len-1].status !== 'air') this.works.status = 1
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: bold;
  padding-left: 8px;
  .confirm-btn {
    margin-left: 10px;
  }
}
.block-display {
  display: flex;
  .works-display {
    width: 430px;
    height: 100%;
    margin: 10px 20px 0 0;
    padding: 0 0 18px 14px;
    overflow: hidden;
    display: flex;
    img {
      border-radius: 4px;
      box-shadow: 0 4px 12px rgb(182, 182, 182);
      height: 50%;
      width: 50%;
    }
    .works-text {
      margin-left: 22px;
      .works-name {
        font-size: 10px;
        color: darkgrey;
      }
      .works-cnname {
        font-size: 22px;
        font-weight: bold;
      }
      .works-status {
        width: 46px;
        border-radius: 4px;
        // box-shadow: 0 2px 8px rgb(182, 182, 182);
        background-color: rgb(172, 243, 172);
        padding: 4px 4px 4px 8px;
        margin: 10px 0 4px 0;
        font-size: 14px;
        font-weight: bold;
      }
      .works-status-end {
        background-color: rgb(243, 172, 172);
      }
      .works-staff {
        margin-top: 8px;
        font-size: 16px;
        letter-spacing: 1px;
      }
    }
  }
}
.option-display{
  margin-left: 14px;
  .item-style {
    display: flex;
    .slider-item {
      width: 320px;
      // padding-bottom: 4px;
    }
  }
}
</style>
