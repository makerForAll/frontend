<template>
    <div>
        <a-button type="primary" @click="visible = true">创建单元</a-button>
        <a-modal :confirm-loading="confirmLoading" v-model:visible="visible" width="600px" title="创建单元" ok-text="创建" cancel-text="取消" @ok="onOk">
            <!-- 表单外层 -->
            <a-form ref="formRef" :model="formStateData" layout="vertical" name="form_in_modal">
                <a-form-item name="region" label="管理地区" :rules="[
                    {
                        required: true,
                        message: '请选择管理地区',
                    },
                ]">
                    <!-- <a-input v-model:value="formStateData.region" disabled /> -->
                    <a-radio-group :disabled="true" v-model:value="formStateData.region" option-type="button" :options="transformUnityRegion"
                        button-style="solid" />
                </a-form-item>

                <a-form-item name="state" label="单元所属性质" :rules="[
                    {
                        required: true,
                        message: 'Please input the title of collection!',
                    },
                ]">
                    <!-- <a-input v-model:value="formStateData.region" disabled /> -->
                    <a-radio-group :disabled="disabledBool" v-model:value="formStateData.state" option-type="button" :options="transformUnityStatus"
                        button-style="solid">
                    </a-radio-group>
                </a-form-item>
                <a-form-item name="unityCode" label="单元编号" :rules="[
                    {
                        required: true,
                        message: '清输入单元编号',
                    },
                ]">
                    <a-input :disabled="disabledBool" size="small" v-model:value="formStateData.unityCode" />
                </a-form-item>

                <!-- 表单2 -->
                <a-form-item name="unityArea" label="单元面积">
                    <a-input :disabled="disabledBool" size="small" v-model:value="formStateData.unityArea" />
                </a-form-item>
                <a-form-item size="small" name="notes" label="备注">
                    <a-textarea :disabled="disabledBool" v-model:value="formStateData.notes" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { FormInstance, message } from 'ant-design-vue';
import request from '../../../api/custom/custom-request';
import {
    UnityType,
    UnityRegion,
    transformUnityRegion,
    UnityStatus,
    transformUnityStatus,
    APIResultForUnityType
} from '../../../types';

export default defineComponent({
    emits:['createData'],
	props: {
        getString:String
	},
    setup(_props,{emit}) {
        // 获取虚拟DOM表单节点
        const formRef = ref<FormInstance>();
        const visible = ref(false);
        const confirmLoading = ref<boolean>(false);
        // const selectValue = ref(1);
        const disabledBool = ref<boolean>(false);
        const formStateData = reactive<UnityType>({
            unityCode: '',
            unityArea: '',
            region: '0',
            state: '',
            notes: '',
        });

        // watchEffect(()=>{
        //     formStateData.region = props.companyCode
        // })
        const onOk = () => {
            formRef?.value
                ?.validateFields() // 验证
                .then((values) => {
                    // 验证成功！
                    console.log('Received values of form: ', values);
                    // -------------- 使用接口创建数据
                    confirmLoading.value = true; // 开始loading 效果
                    disabledBool.value = true; // 提交时，在没有出结果前禁止编辑。
                    // 开始请求 
                    request({
                        // 初始化
                        method: 'post',
                        url: '/unities/',
                        data: { ...formStateData },
                    }).then((res) => {
                            // 返回数据
                            message.success('成功创建单元');
                            console.log(res); 
                            emit("createData",res.data as APIResultForUnityType)
                            setTimeout(() => {
                                confirmLoading.value = false;
                                visible.value = false;
                                disabledBool.value = false;
                                formRef?.value?.resetFields(); // 清空表单中填入的数据
                            }, 1000);
                        })
                        .catch((error) => {
                            message.error('创建失败' + error);
                            console.log('创建失败' + error)
                            setTimeout(() => {
                                confirmLoading.value = false;
                                disabledBool.value = false;
                                // visible.value = false;
                                // formRef?.value?.resetFields(); // 清空表单中填入的数据
                            }, 1000);
                        });
                    // --------------- 接口 end
                 
                })
                .catch((info) => {
                    console.log('Validate Failed:', info);
                });
        };

        return {
            // formState,
            formStateData,
            formRef,
            visible,
            onOk,
            confirmLoading,
            // selectValue,
            disabledBool,
            UnityRegion,
            UnityStatus,
            transformUnityRegion,
            transformUnityStatus,
        };
    },
});
</script>
<style>
.collection-create-form_last-form-item {
    margin-bottom: 0;
}
</style>
