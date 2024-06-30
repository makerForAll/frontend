<template>
  <a-popconfirm
    @confirm="handleConfirm(clientStore.currentSelectObjID as string)"
    @cancel="handleCancel"
  >
     
      <template #icon><question-circle-outlined style="color: red" />
        请联系管理员,输入密码,才能删除。
        <a-input v-model:value="password" placeholder="Password" />
      </template>
<a-button type="link" danger>删除</a-button>
  </a-popconfirm>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
// 删除功能
import { useClientStore } from "@/stores/client";
const clientStore = useClientStore();


const visible = ref(false);
const password = ref('');

const handleConfirm = async (id:string) => {
  if (password.value === '8888') {
    await clientStore.delete(id);
  // dataSource.value = dataSource.value.filter(item => item.id !== id);
  // 返回一个新的数组，这个数组包含了 dataSource.value 中所有 id 不等于给定 id 的元素。
    // message.success('密码正确,删除成功');
  } else {
    message.error('密码错误，删除失败');
  }
  visible.value = false;
  password.value = '';
};

const handleCancel = () => {
  visible.value = false;
  password.value = '';
};

const handleVisibleChange = (newVisible: boolean) => {
  visible.value = newVisible;
};



</script>

<style scoped>
/* Add any custom styles here */
</style>
