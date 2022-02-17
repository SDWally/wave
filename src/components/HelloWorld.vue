<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>今日最佳股票</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">德赛电池</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">宁德时代</a></li>
            <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">通策医疗</a></li>
    </ul>
    <h3>未来一周大盘预测</h3>
    <div ref="chart" style="width:100%;height:376px"></div>
    <h3>未来一周行业预测</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
import { getFactor } from '@/api/data'

export default {
  name: 'HelloWorld',
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
</style>
