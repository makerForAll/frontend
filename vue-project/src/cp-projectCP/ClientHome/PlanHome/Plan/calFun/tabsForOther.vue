<template>
    <h1>分摊计算工具</h1>
    <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="计算分摊1">
            <cal></cal>
        </a-tab-pane>
        <a-tab-pane key="2" tab="计算分摊2">
        <calTwo></calTwo>
        </a-tab-pane>
        <a-tab-pane key="3" tab="#3">
        </a-tab-pane>

    </a-tabs>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import cal from './cal.vue';   
import calTwo from './calTwo.vue';

export default defineComponent({
    components: {
        cal,
        calTwo
    },
    setup() {
        // const svgPath = ref("../assets/svg/TopViewofContractDocument/0201.svg");
        // const svgPath2 = ref("../assets/svg/TopViewofContractDocument/0301.svg");
        return {
            activeKey: ref('1'),
        };
    },
});
</script>
  
  