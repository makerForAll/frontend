  <template>
    <!-- 按钮 -->
    <a-button type="link" @click="showDrawer">
      {{ action }}{{ entityType }}
    </a-button>
    <!-- 抽屉 -->
    <a-drawer v-if="isDelete" title="Create a new account" :width="720" :open="isOpen"
      :body-style="{ paddingBottom: '80px' }" :footer-style="{ textAlign: 'right' }" @close="closeDrawer"
      @AfterOpenChange="deleteDrawer"
      >
      
      <!-- 尝试组件 -->
      <!-- {{ form }} -->
      <a-form :model="internalForm" :rules="rules" layout="vertical">
        <a-row :gutter="16">
          <template v-for="field in fields" :key="field.name">
            <a-col :span="field.span || 24">
              <a-form-item :label="field.label" :name="field.name">
                <component :is="field.component" v-model:value="internalForm[field.name]" v-bind="field.props" >
                  <!-- a-select begin -->
                <template v-if="field.component === 'a-select'">
                  <a-select v-model:value="internalForm[field.name]" :placeholder="field.props?.placeholder">
                    <a-select-option v-for="option in field.props?.options ?? []" :key="option" :value="option">
                      {{ option }}
                    </a-select-option>
                  </a-select>
                </template>
                <!-- a-select end -->
                </component>
              </a-form-item>
            </a-col>
          </template>
        </a-row>
        {{ modelValue }}
      </a-form>

      <!-- 操作区域 -->
      <template #extra>
        <a-space>

          <a-button @click="closeDrawer">关闭</a-button>
          <a-button type="primary" @click="handleSubmit">提交</a-button>
        </a-space>
      </template>
    </a-drawer>
  </template>

<script setup lang="ts">
import type { Rule } from 'ant-design-vue/es/form';
import { PlusOutlined } from '@ant-design/icons-vue/';
import { reactive, ref, watch } from 'vue';
// import { initClientForm } from '@/api/services/client';
// import {useCPStore} from '@/stores/cp'
// const cpStore = useCPStore();

const isOpen = ref<boolean>(false);
const isDelete = ref<boolean>(!false);

const props = defineProps<{
  entityType: string;
  action: string;
  modelValue: Record<string, any>;
  fields: Array<{ 
    name: string; 
    label: string; 
    component: string; 
    props?: { placeholder?: string; options?: string[] }; 
    span?: number 
  }>;
  rules: Record<string, Rule[]>;
  type: String
}>()


let internalForm = reactive({ ...props.modelValue });

const emit = defineEmits(['handleSubmit', 'showDrawer']);

// 监听 props.modelValue 的变化

watch(
  () => props.modelValue,
  (newValue) => {
    for (const key in newValue) {
      internalForm[key] = newValue[key];
    }
    console.log("internalForm watch--------------------------:", internalForm);
  },
  { deep: true } // 深度监听
);


const showDrawer = async () => {
  await resetForm();
  emit('showDrawer')
  // await cpStore.openDrawer();
  isOpen.value = true;
  isDelete.value = !false;
}

const deleteDrawer = () => {
  if (isOpen.value == false) {
    isDelete.value = !true;
  }
}

const closeDrawer = async() => {
  isOpen.value = false;
  // await cpStore.closeDrawer();
  deleteDrawer();
}

const handleSubmit = () => {
  emit('handleSubmit', internalForm)
  closeDrawer();
}

const resetForm = async () => {
  await Object.assign(internalForm, initClientForm);
  // internalForm = reactive({...initClientForm})
}

</script>

<style scoped></style>