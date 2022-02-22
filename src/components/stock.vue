<template>
  <div class="hello">
    <h3>今日最佳股票</h3>
    <ul>
      <li><a href="https://xueqiu.com/S/SH600276" target="_blank" rel="noopener">恒瑞医药</a></li>
      <li><a href="https://xueqiu.com/S/SH601318" target="_blank" rel="noopener">中国平安</a></li>
      <li><a href="https://xueqiu.com/S/SZ002594" target="_blank" rel="noopener">比亚迪</a></li>
    </ul>
  </div>
</template>

<script>
// import { getFactor } from '@/api/data'

export default {
  name: 'Stock',
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
  },
  methods: {
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
