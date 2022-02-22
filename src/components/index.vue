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
      }]
      }
  },
  props: {
  },
  mounted(){
    let dates = this.get_start_and_end();
    let dates_industry = this.get_start_and_end(90)
    getFactor("factor_index_quote_close", "000001.SH", dates[0], dates[1]).then(this.getEchartData);
    getFactor("factor_index_quote_close", "000001.SH", dates_industry[0], dates_industry[1]).then(this.getEchartIndustry);
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
              {
                gt: date_num - 6,
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
      getEchartIndustry(index_quote) {
        let x_data = index_quote.data["000001.SH"].date
        let date_num = x_data.length
        for (let ind in this.industry) {
          // console.log()
          const chart = this.$refs[this.industry[ind].name][0]
          // console.log(chart)
          if (chart) {
            const myChart = this.$echarts.init(chart)
            const option = {
              title: {
                text: this.industry[ind].name,
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
                  {
                    gt: date_num - 6,
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
    }}
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
