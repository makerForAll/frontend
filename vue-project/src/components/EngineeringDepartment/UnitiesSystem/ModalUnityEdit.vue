<template>
	<div>
		<a-button type="primary" @click="visible = true">编辑单元</a-button>
		<a-modal
			v-model:visible="visible"
            width="600px"
			title="编辑单元"
			ok-text="编辑"
			cancel-text="取消"
			@ok="onOk"
		>
			<!-- 表单外层 -->
			<a-form
				ref="formRef"
				:model="formStateData"
				layout="vertical"
				name="form_in_modal"
			>
			<a-form-item
					name="_id"
					label="ID"
					:rules="[
						{
							required: true,
							message: 'Please input the title of collection!',
						},
					]"
				>
					<a-input v-model:value="formStateData._id" disabled/>
				</a-form-item>

				<a-form-item
					name="unityCode"
					label="单元编号"
					:rules="[
						{
							required: true,
							message: 'Please input the title of collection!',
						},
					]"
				>
					<a-input v-model:value="formStateData.unityCode" />
				</a-form-item>

				<a-form-item
					name="region"
					label="管理地区"
					:rules="[
						{
							required: true,
							message: 'Please input the title of collection!',
						},
					]"
				>
					<a-radio-group
						v-model:value="formStateData.region"
						option-type="button"
						:options="transformUnityRegion"
						button-style="solid"
					/>
				</a-form-item>
				<a-form-item
					name="state"
					label="单元所属性质"
					:rules="[
						{
							required: true,
							message: 'Please input the title of collection!',
						},
					]"
				>
					<!-- <a-input v-model:value="formStateData.region" disabled /> -->
					<a-radio-group
						v-model:value="formStateData.state"
						option-type="button"
						:options="transformUnityStatus"
						button-style="solid"
					>
					</a-radio-group>
				</a-form-item>

				<!-- 表单2 -->
				<a-form-item name="unityArea" label="单元面积">
					<a-textarea v-model:value="formStateData.unityArea" />
				</a-form-item>
				<a-form-item name="allocatedArea" label="分摊后面积">
					<a-textarea v-model:value="formStateData.allocatedArea" />
				</a-form-item>
				<a-form-item name="selected" label="选择">
					<a-textarea v-model:value="formStateData.selected" disabled />
					<a-radio-group
						v-model:value="formStateData.selected"
						name="radioGroup"
					>
						<a-radio value="false" true-value>0</a-radio>
						<a-radio value="true" false-value>1</a-radio>
					</a-radio-group>
				</a-form-item>
				<a-form-item name="notes" label="备注">
					<a-textarea v-model:value="formStateData.notes" />
				</a-form-item>
				<a-form-item name="setTextPos" label="坐标">
					<a-textarea v-model:value="formStateData.setTextPos" />
				</a-form-item>
				<a-form-item name="rotate" label="旋转角度">
					<a-textarea v-model:value="formStateData.rotate" />
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>
<script lang="ts">
import { PropType, defineComponent, reactive, ref, watchEffect } from 'vue';
import { FormInstance, message } from 'ant-design-vue';
import request from '../../../utils/request';
import { UnityType, UnityRegion, UnityStatus } from '../../../types';

export default defineComponent({
	emits:['upDataTableData'],
	props: {
		msg: String,
		addDataToArrFun: Function,
		region: String,
		unityObj: Object as PropType<UnityType>,
	},
	setup(props,{emit}) {
		// 获取虚拟DOM表单节点
		const formRef = ref<FormInstance>();
		const visible = ref(false);
		
		const selectValue = ref<boolean>(false);
		const formStateData = reactive<UnityType>({ ...props.unityObj });

		watchEffect(() => {
			Object.assign(formStateData, props.unityObj);
		});

		const transformUnityRegion = UnityRegion.map((item) => ({
			label: item.text,
			value: item.value.toString(),
		}));

		const transformUnityStatus = UnityStatus.map((item) => ({
			label: item.text,
			value: item.value.toString(),
		}));

		// watchEffect(() => {
		//     console.log(transformUnityRegion, transformUnityStatus);
		// })
		const onOk = () => {
			formRef?.value
				?.validateFields()
				.then((values) => {
					console.log('Received values of form: ', values);
					// -------------- 使用接口创建数据
					request({
						// 初始化
						method: 'patch',
						url: '/unities/' + formStateData._id,
						data: {
							...formStateData
						},
					}).then((res) => {
						// 返回数据
						console.log("res 更新数据",res);
						message.success('更新成功');
						console.log("formStateDataformStateData======",values)
						emit('upDataTableData',values)
					});
					// --------------- 接口 end
					// console.log('formState: ', toRaw(formState));
					visible.value = false; // 关闭模态框
					
					formRef?.value?.resetFields(); // 清空表单中填入的数据
					// console.log('reset formState: ', toRaw(formState));
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
			selectValue,
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
