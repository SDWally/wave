<template>
  <div class="hello">
    <h3>未来五日大盘预测</h3>
    <div ref="chart" style="width:100%;height:376px"></div>
  </div>
</template>

<script>
import { getFactor } from '@/api/data'

export default {
  name: 'Index',
  data() {
    return { 
      industry: [{
        "name": "银行",
        "date": [],
        "value": []
      }, {
        "name": "汽车",
        "date": [],
        "value": []
      }, {
        "name": "基建",
        "date": [],
        "value": []
      }],
      }
  },
  props: {
  },
  mounted(){
    Promise.all([
      getFactor("factor_index_quote_close", "000001.SH", this.$moment().subtract(180, 'days').format('YYYY-MM-DD'), this.$moment().format('YYYY-MM-DD')),
      getFactor("factor_index_forecast_1", "000001.SH", this.$moment().subtract(1, 'days').format('YYYY-MM-DD'), this.$moment().subtract(-5, 'days').format('YYYY-MM-DD'))
      ]
      ).then(
      res => this.getEchartData(res[0], res[1])
      );
  },
  methods: {
    getEchartData(index_quote, index_forecast) {
      var index_date = index_quote.data["000001.SH"].date;
      var index_value = index_quote.data["000001.SH"].value;
      console.log(index_date[index_date.length-1])
      console.log(index_forecast.data["000001.SH"].date[0])
      if (index_date[index_date.length-1] === index_forecast.data["000001.SH"].date[0]) {
        console.log("today forecast finished.")
        index_date = index_date.concat(index_forecast.data["000001.SH"].date.slice(1));  
        index_value = index_value.concat(index_forecast.data["000001.SH"].value.slice(1));
      }
      else {
        index_date = index_date.concat(index_forecast.data["000001.SH"].date);
        index_value = index_value.concat(index_forecast.data["000001.SH"].value);
      }
      console.log(index_forecast)
      let x_data_forecast = index_forecast.data["000001.SH"].date
      let date_num_forecast = x_data_forecast.length
      let x_data = index_date
      let date_num = x_data.length
      // console.log(date_num)
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
            data: index_date
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
                lte: date_num - date_num_forecast,
                color: 'green'
              },
              {
                gt: date_num - date_num_forecast,
                lte: 10000,
                color: 'rgba(30, 144, 255, 0.9)'
              },
            ]
          },
          series: [
            {
              name: '收盘价',
              type: 'line',
              smooth: true,
              // prettier-ignore
              data: index_value,
              markArea: {
                itemStyle: {
                  color: 'rgba(135, 206, 235, 0.4)'
                },
                data: [
                  [
                    {
                      name: '预测区间',
                      xAxis: x_data[date_num - date_num_forecast]
                    },
                    {
                      xAxis: x_data[date_num-1]
                    }
                  ],
                ]
              }
            }
          ]
};
        myChart.setOption(option)
        window.addEventListener("resize", function() {
          myChart.resize()
        })
        this.$on('hook:destroyed',()=>{
          window.removeEventListener("resize", function() {
            // if (!this.chart) {
            //   return
            // }
          myChart.resize();
        });
        })
      }
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
