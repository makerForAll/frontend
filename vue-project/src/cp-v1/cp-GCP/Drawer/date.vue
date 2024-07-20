<template>
    <div style="margin-bottom: 16px">
      <span style="margin-right: 16px">Change locale of components:</span>
      <!-- <a-radio-group v-model:value="locale">
        <a-radio-button key="en" :value="enUS.locale">English</a-radio-button>
        <a-radio-button key="cn" :value="zhCN.locale">中文</a-radio-button>
      </a-radio-group> -->
    </div>
    <a-config-provider :locale="locale === 'en' ? enUS : zhCN">
    
          <a-date-picker />
        
  
   

      

    </a-config-provider>
  </template>
  <script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { Modal, theme } from 'ant-design-vue';
  import type { TourProps, UploadFile } from 'ant-design-vue';
  import { EllipsisOutlined } from '@ant-design/icons-vue';
   // 组件中文化
  import zhCN from 'ant-design-vue/es/locale/zh_CN';

  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: [
        {
          text: 'filter1',
          value: 'filter1',
        },
      ],
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
  ];
  
  const visible = ref(false);
  // const locale = ref(enUS.locale);
  // watch(locale, val => {
  //   dayjs.locale(val);
  // });

  const info = () => {
    Modal.info({
      title: 'some info',
      content: 'some info',
    });
  };
  const confirm = () => {
    Modal.confirm({
      title: 'some info',
      content: 'some info',
    });
  };
  
  const formModel = ref({
    username: '',
    age: '100',
  });
  
  const { token } = theme.useToken();
  
  const fileList: UploadFile[] = [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      percent: 50,
      name: 'image.png',
      status: 'uploading',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'error',
    },
  ];
  
  const ref1 = ref(null);
  const ref2 = ref(null);
  const ref3 = ref(null);
  const current = ref(0);
  const tourOpen = ref(false);
  const steps: TourProps['steps'] = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => ref1.value && ref1.value.$el,
    },
    {
      title: 'Save',
      description: 'Save your changes.',
      target: () => ref2.value && ref2.value.$el,
    },
    {
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => ref3.value && ref3.value.$el,
    },
  ];
  </script>
  
  