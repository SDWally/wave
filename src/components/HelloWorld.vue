<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>今日最佳股票</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">恒瑞医药</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">中国平安</a></li>
            <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">比亚迪</a></li>
    </ul>
    <h3>未来五日大盘预测</h3>
    <div ref="chart" style="width:100%;height:376px"></div>
    <h3>未来一周行业预测</h3>
    <div class="flex-container">
      <div v-for="item in a" v-bind:key="item"  class="flex-item">
        {{item}}
      </div>
      <div class="flex-item">flex item 2</div>
      <div class="flex-item">flex item 3</div>  
    </div>
  </div>
</template>

<script>
import { getFactor } from '@/api/data'

export default {
  name: 'HelloWorld',
  data: {
    a: [1, 2, 3]
  },
  props: {
    msg: String
  },
  mounted(){
    let dates = this.get_start_and_end();
    let start = dates[0]
    let end = dates[1]
    getFactor("factor_index_quote_close", "000001.SH", start, end).then(this.getEchartData);
  },
  methods: {
    get_start_and_end(days=180) {
      let start = this.$moment().subtract(days, 'days').format('YYYY-MM-DD');
      let end = this.$moment().format('YYYY-MM-DD');
      return [start, end]
    },
    getEchartData(index_quote) {
      let x_data = index_quote.data["000001.SH"].date
      let date_num = x_data.length
      console.log(date_num)
      const chart = this.$refs.chart
      
      if (chart) {
        const myChart = this.$echarts.init(chart)
        const option = {
  title: {
    text: '上证指数',
    subtext: '最新趋势图'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    // prettier-ignore
    data: index_quote.data["000001.SH"].date
  },
  yAxis: {
    type: 'value',
    min: function(value) {return value.min - 100;},
    max: function(value) {return value.max + 100;},
    axisLabel: {
      formatter: '{value} '
    },
    axisPointer: {
      snap: true
    }
  },
  visualMap: {
    show: false,
    dimension: 0,
    pieces: [
      {
        lte: date_num - 6,
        color: 'green'
      },
      // {
      //   gt: 100,
      //   color: 'red'
      // },
      {
        gt: date_num - 6,
        lte: 10000,
        color: 'rgba(30, 144, 255, 0.9)'
      },
      // {
      //   gt: 50,
      //   lte: 53,
      //   color: 'red'
      // },
      // {
      //   gt: 53,
      //   color: 'green'
      // }
    ]
  },
  series: [
    {
      name: '收盘价',
      type: 'line',
      smooth: true,
      // prettier-ignore
      data: index_quote.data["000001.SH"].value,
      markArea: {
        itemStyle: {
          color: 'rgba(135, 206, 235, 0.4)'
        },
        data: [
          [
            {
              name: '预测区间',
              xAxis: x_data[date_num-6]
            },
            {
              xAxis: x_data[date_num-1]
            }
          ],
          // [
          //   {
          //     name: 'Evening Peak',
          //     xAxis: '17:30'
          //   },
          //   {
          //     xAxis: '21:15'
          //   }
          // ]
        ]
      }
    }
  ]
};
        myChart.setOption(option)
        window.addEventListener("resize", function() {
          myChart.resize()
        })
      }
      this.$on('hook:destroyed',()=>{
          window.removeEventListener("resize", function() {
          myChart.resize();
        });
        })
      },
      getEchartData2(index_quote) {
        const chart = this.$refs.chart
        if (chart) {
          const myChart = this.$echarts.init(chart)
          const option = {
                  xAxis: {
                    type: 'category',
                    data: index_quote.data["000001.SH"].date
                  },
                  yAxis: {
                    type: 'value',
                    min: function(value) {return value.min - 100;},
                    max: function(value) {return value.max + 100;},
                  },
                  series: [
                    {
                      data: index_quote.data["000001.SH"].value,
                      type: 'line',
                      smooth: true
                    }
                  ]
                };
          myChart.setOption(option)
          window.addEventListener("resize", function() {
            myChart.resize()
          })
        }
        this.$on('hook:destroyed',()=>{
            window.removeEventListener("resize", function() {
            myChart.resize();
          });
          })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.flex-container {
    display: -webkit-flex;
    display: flex;
    /* width: 400px; */
    height: 250px;
    /* background-color: lightgrey; */
    justify-content: center;
    align-items: center;
}

.flex-item {
    background-color: 'rgba(0, 0, 205, 0.8)';
    width: 300px;
    height: 200px;
    margin: 10px;
}
</style>
