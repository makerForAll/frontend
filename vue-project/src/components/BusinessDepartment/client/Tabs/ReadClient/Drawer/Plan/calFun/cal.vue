<template>
  <div>
    <!-- <a-form-item name="contractCode" label="目标租金总金额" :rules="[{ required: true, message: '请输入合同编号' }]">
        <a-input v-model:value="inputGargetValue"  />
        <button>提交</button>
      </a-form-item> -->
      <h2>租金总金额</h2>
      <a-input-group compact style="width: 300px;">
      <a-input v-model:value="inputGargetValue" style="width: calc(100% - 200px)" />
      <a-button type="primary" @click="updateChart">Submit</a-button>
    </a-input-group>
    <a-row>
      <div id="chart" style="width: 100%; height: 400px;"></div>
      <!-- <a-col :span="12">
        <span>增长率</span>
        <a-slider v-model:value="inputValue" :min="0" :max="1" :step="0.01" />
      </a-col>
      <a-col :span="4">
        <a-input-number v-model:value="inputValue" :min="0" :max="1" :step="0.01" style="margin-left: 16px" />
      </a-col> -->
    </a-row>
  </div>
</template>
<script lang="ts">
// import echarts from 'echarts';
import * as echarts from 'echarts';
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
  setup() {
    const dataInBox = ref<Array<Array<number | string>>>([]);
    let chartInstance: echarts.ECharts | null = null;
    const updateChart = () => {
      if (chartInstance) {
        chartInstance.dispose();
      }
      const chartInit = echarts.init(document.getElementById("chart") as HTMLElement);
      const option = {
        title: {
          text: 'Scatter Chart Example',
        },
        xAxis: {
          type: 'value',
          scale: true,
        },
        yAxis: {
          type: 'value',
          scale: true,
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}',
        },
        series: [
          {
            name: 'Data Points',
            type: 'scatter',
            data: dataInBox.value,
          },
        ],
      };
      chartInit.setOption(option);
    }

    onMounted(() => {
      // const chart = ref<HTMLElement|null>(null);
      // console.log(chart);
      // const chartInit = echarts.init(document.getElementById("chart") as HTMLElement);

      updateChart();
      
    })


    // 目标租金总金额
    const inputGargetValue = ref<number>(206578.56);  // 目标金额
    const targetValueMax = inputGargetValue.value + 100;
    const targetValueMin = inputGargetValue.value - 100;

    // 定义初始月租金取值范围
    const initRentValue = ref<number>(0);
    const minX = 10;
    const maxX = 100000;

    // 定义增长率取值范围
    const minY = 1.00;
    const maxY = 1.08;


    // 定义计算公式
    const formula1 = (y: any) => Math.pow(y, 1) + Math.pow(y, 2)
    //  + Math.pow(y, 3) + Math.pow(y, 4);
    // const formula1 = (y: any) => Math.pow(y, 1)+ Math.pow(y, 2);
    // 定义目标值
    const target1 = inputGargetValue.value;
    // const target2 = 15840;
    // 计算可选值
    const optionsData = [];
    // 遍历所有组合可能性
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y += 0.01) {
        // x 每个月可以拿到的钱
        const result1 = 12 * x * (1 + formula1(y));
        // const result2 = 6 * x * (1 + formula2(y));
        if (Math.abs(result1 - inputGargetValue.value) <= 100) {
          if (x > 70) {
            // maxOneValue = x;
            optionsData.push([x, y.toFixed(2)]);
          }
          // console.log(maxOneValue);

        }
      }
    }
    
    dataInBox.value = optionsData;
    // 输出结果
    console.log(optionsData);
    return {
      minX,
      maxX,
      initRentValue,
      inputGargetValue,
      targetValueMax,
      targetValueMin,
      updateChart
    };
  },
});
</script>
<style scoped>
.code-box-demo .ant-slider {
  margin-bottom: 16px;
}
</style>
  