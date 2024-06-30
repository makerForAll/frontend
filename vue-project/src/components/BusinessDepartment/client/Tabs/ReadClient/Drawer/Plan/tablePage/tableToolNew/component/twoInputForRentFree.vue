<template>
  <a-tabs v-model:activeKey="activeKey" @change="handleClick">
    <a-tab-pane key="1" tab="默认模式[无免租]" >
      {{ activeKey }}
    </a-tab-pane>
    <a-tab-pane key="2" tab="免租模式[头部免租]" >
      {{ activeKey }}
      <label for="deposit">免租月数</label>
        <a-input type="number" @change="handleClick" style="width:50%" id="deposit" v-model:value="rentFreeMonths" placeholder="月数" />
        {{ rentFreeMonths }}
        <!-- <input type="text" id="deposit" v-model:value="myInputValue.payModeValue"><br> -->
    </a-tab-pane>
    <a-tab-pane key="3" tab="免租模式[尾部免租]">
      {{ activeKey }}
      <a-input type="number" @change="handleClick" style="width:50%" id="deposit" v-model:value="rentFreeMonths" placeholder="月数" />
      {{ rentFreeMonths }}
    </a-tab-pane>
    <a-tab-pane key="4" tab="额度模式[每年配比消耗]">
      {{ activeKey }}
      <a-input type="number" @change="handleClick" style="width:50%" id="deposit" v-model:value="rentFreeMonths" placeholder="月数" />
      {{ rentFreeMonths }}
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  emits: ['update'],
  methods: {
    handleClick() {
      // 触发自定义事件并传递数据
      this.$emit('update', this.activeKey,this.rentFreeMonths);

    }
  },
  setup() {
    const activeKey = ref('1');
    const rentFreeMonths = ref(0);
    const test = () => {
      // console.log("test");
      // console.log(activeKey.value)
    }
    return {
      activeKey,
      test,
      rentFreeMonths
    };
  },
});
</script>
  <!-- 
    
    免租模式
        头尾免租
            头部 免租半年
            尾部 免租2年
        
        额度免租，每年扣除
            每年减免半年租金，积累到满2年。

   -->