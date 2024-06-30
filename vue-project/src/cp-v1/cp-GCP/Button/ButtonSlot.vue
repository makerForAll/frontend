<template>
    <a-popconfirm
      @confirm="handleConfirm"
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

  
  const props = defineProps<{
    Confirm: (password: string) => void;
  }>()

  const visible = ref(false);
  const password = ref('');
  

  const handleConfirm = () => {
  props.Confirm(password.value);
  visible.value = false;
  password.value = '';
};
//   const handleConfirm = async (id:string) => {
//     if (password.value === '8888') {
//       await clientStore.delete(id);
//       await clientStore.read();
//     } else {
//       message.error('密码错误，删除失败');
//     }
//     visible.value = false;
//     password.value = '';
//   };
  
  const handleCancel = () => {
    visible.value = false;
    password.value = '';
  };
  
//   const handleVisibleChange = (newVisible: boolean) => {
//     visible.value = newVisible;
//   };
  

 
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  