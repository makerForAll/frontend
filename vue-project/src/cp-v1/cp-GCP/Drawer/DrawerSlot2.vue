<template>
  <a-button type="primary" @click="showDrawer">
    <template #icon><PlusOutlined /></template>
    {{ action }} {{ entityType }}
  </a-button>
  <a-drawer
    :title="action + ' ' + entityType"
    :width="720"
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
import { PlusOutlined } from '@ant-design/icons-vue/';
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
    fetchAndSetFormData(props.updateId); // 当打开抽屉时，加载相应的数据
  }
};

const onClose = () => {
  open.value = false;
};

const form = reactive({ ...props.form });

const handleSubmit = () => {
  props.onSubmit(form, props.updateId);
  onClose();
};

const fetchAndSetFormData = async (id: string) => {
  const event = new CustomEvent('updateData', { detail: id });
  window.dispatchEvent(event);
};

watch(() => props.updateId, (newId) => {
  if (newId) {
    fetchAndSetFormData(newId);
  }
});

const resetForm = (initialForm: Record<string, any>) => {
  Object.keys(initialForm).forEach(key => {
    form[key] = initialForm[key];
  });
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
