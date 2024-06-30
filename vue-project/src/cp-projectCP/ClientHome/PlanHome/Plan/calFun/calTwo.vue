<template>
  <div>
    <a-row>
      <a-col :span="12">
        <span>初始月租金</span>
        <a-slider v-model:value="inputValue1" :min="500" :max="2000" />
      </a-col>
      <a-col :span="4">
        <a-input-number v-model:value="inputValue1" :min="500" :max="2000" style="margin-left: 16px" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12">
        <span>增长率</span>
        <a-slider v-model:value="inputValue" :min="0" :max="1" :step="0.01" />
      </a-col>
      <a-col :span="4">
        <a-input-number v-model:value="inputValue" :min="0" :max="1" :step="0.01" style="margin-left: 16px" />
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const inputValue = ref<number>(0);
    const inputValue1 = ref<number>(1);
    // 定义初始月租金取值范围
    const minX = 500;
    const maxX = 1500;
    // 定义增长率取值范围
    const minY = 1.00;
    const maxY = 2.00;
    // 定义计算公式
    const formula1 = (y: any) => Math.pow(y, 1) + Math.pow(y, 2) + Math.pow(y, 3) + Math.pow(y, 4) + Math.pow(y, 5);
    const formula2 = (y: any) => Math.pow(y, 1) + Math.pow(y, 2) + Math.pow(y, 3);
    // 定义目标值
    const target1 = 626092.38;
    const target2 = 15840;
    // 计算可选值
    const options = [];
    // 遍历所有组合可能性
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y += 0.01) {
        const result1 = 6 * x * (1 + formula1(y));
        const result2 = 6 * x * (1 + formula2(y));
        let maxOneValue = 0;
        let maxTwoValue = 0;
        if (Math.abs(result1 - target1) <= 15000 && Math.abs(result2 - target2) <= 3000) {
          if (x > 700) {
            // maxOneValue = x;
            options.push({ x, y: parseFloat(y.toFixed(2)) });
          }
          // console.log(maxOneValue);

        }
      }
    }
    // 输出结果
    console.log(options);
    return {
      inputValue,
      inputValue1,
    };
  },
});
</script>
<style scoped>
.code-box-demo .ant-slider {
  margin-bottom: 16px;
}
</style>
  