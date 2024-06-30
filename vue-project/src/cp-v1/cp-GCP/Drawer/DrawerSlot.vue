<template>
  <a-button type="primary" @click="showDrawer">
    <template #icon><PlusOutlined /></template>
    {{ action }} {{ entityType }}
  </a-button>
  <a-drawer
    :title="action + ' ' + entityType"
    :width="720"
    :open="open"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-form :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <template v-for="field in fields" :key="field.name">
          <a-col :span="12">
            <a-form-item :label="field.label" :name="field.name">
              <component
                :is="field.component"
                v-model:value="form[field.name]"
                v-bind="field.props"
              />
            </a-form-item>
          </a-col>
        </template>
      </a-row>
    </a-form>
    <template #extra>
      <a-space>
        <a-button @click="onClose">取消</a-button>
        <a-button type="primary" @click="handleSubmit">提交</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import type { Rule } from 'ant-design-vue/es/form';

const props = defineProps<{
  entityType: string;
  action: string;
  form: Record<string, any>;
  fields: Array<{ name: string; label: string; component: string; props?: Record<string, any> }>;
  rules: Record<string, Rule[]>;
  onSubmit: (form: Record<string, any>, id?: string) => void;
  updateId?: string;
}>();




const open = ref<boolean>(false);

const showDrawer = () => {
  open.value = true;
  if (props.updateId) {
    resetForm(props.form); // 当打开抽屉时，将表单重置为初始状态
  }
};

const onClose = () => {
  open.value = false;
};

const form = reactive({ ...props.form });

const handleSubmit = () => {
  console.log("slot form:",props.form);
  props.onSubmit(form, props.updateId);
  onClose();
};

// watch(() => props.updateId, (newId) => {
//   if (newId) {
//     // 触发外部事件来获取数据并更新表单，这部分逻辑在外部组件中处理
//     const event = new CustomEvent('updateData', { detail: newId });
//     window.dispatchEvent(event);
//   }
// });



// watch([() => props.updateId, () => form], ([newId, newForm]) => {
//   if (newId) {
//     // 触发外部事件来获取数据并更新表单，这部分逻辑在外部组件中处理
//     const event = new CustomEvent('updateData', { detail: newId });
//     window.dispatchEvent(event);
//   }
//   // 如果表单发生变化，进行相应的处理
//   console.log("Form updated:", newForm);
// });

const resetForm = (initialForm: Record<string, any>) => {
  Object.keys(initialForm).forEach(key => {
    form[key] = initialForm[key];
  });
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
