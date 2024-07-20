<template>
    <a-space>
        <ModalUnityCreate :get-string="'string'" @createData="addTableDataToSource" />
        token过期时间：{{ dateString }}
    </a-space>

    <a-space style="float:right; margin-right: 50px;margin-bottom: 20px;">
        <!-- <a-button type="primary">合同用图</a-button>
        <a-button type="primary">实况图</a-button>
        <a-button type="primary">测绘图</a-button>
        <a-button type="primary">房产证图</a-button> -->
        <!-- <SurveyReport />
        <PropertyOwnershipCertificate /> -->
    </a-space>
    <a-table class="unityTable" :scroll="{ x: 1500, y: 490 }" :columns="columns" :row-key="(record: any) => record.id"
        :data-source="storeItem?.results" :pagination="pagination" :loading="loading" @change="handleTableChange">
        <!-- name配置 -->
        <template #headerCell="{ column }">
            <template v-if="column.dataIndex === 'contractCode'">
                <span style="color: #1890ff">Name</span>
                <!-- 改变column样式 -->
            </template>
        </template>

        <template #customFilterDropdown="{
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            column,
        }">
            <!-- setSelectedKeys: 设置被选中的筛选值的数组,联动修改  selectedKeys中的值-->
            <!-- selectedKeys: 当前被选中的筛选值的数组本身 -->
            <!-- confirm: 确认当前选中的筛选值，并关闭下拉菜单 -->
            <!-- clearFilters: 清空当前已选中的筛选值 -->
            <!-- column: 当前列的配置信息 -->
            <!-- 事件change 指搜索框的值发生修改时触发 -->
            <!-- 事件pressEnter 指使用键盘的 Enter 来触发提交【最终搜索框的数据，，所在列dataIndex】 -->
            <div style="padding: 8px">
                <a-input ref="searchInput" :placeholder="`Search ${column.dataIndex}`" :value="selectedKeys[0]"
                    style="width: 188px; margin-bottom: 8px; display: block"
                    @change="(e: any) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                    @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)" />

                <!-- 重置 -->
                <a-button size="small" style="width: 90px; margin-right: 8px" @click="handleReset(clearFilters)">
                    重置
                </a-button>
                <!-- 搜索 -->
                <a-button type="primary" size="small" style="width: 90px"
                    @click="handleSearch(selectedKeys, confirm, column.dataIndex)">
                    <template #icon>
                        <SearchOutlined />
                    </template>
                    搜索
                </a-button>
            </div>
        </template>
        <!-- 搜索框按钮icon -->
        <template #customFilterIcon="{ filtered, column }">
            <search-outlined v-if="column.customFilterDropdown" :style="{ color: filtered ? '#108ee9' : undefined }" />
            <filter-outlined v-else :style="{ color: filtered ? '#108ee9' : undefined }" />
        </template>

        <!-- 搜索【高亮效果】，当搜索成功后，会在对应的所在列上显示 与 搜索内容一样的 高亮 -->
        <template #bodyCell="{ text, column, record }">
            <span v-if="searchText && searchedColumn === column.dataIndex">
                <template v-for="(fragment, i) in text
                    .toString()
                    .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
                    <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i" class="highlight">
                        {{ fragment }}
                    </mark>
                    <template v-else>{{ fragment }}</template>
                </template>
            </span>

            <span v-if="column.dataIndex == 'selected'">
                {{ text }}
            </span>
            <span v-if="column.dataIndex == 'contractItem'">
                {{ text }}
            </span>

            <template v-if="column.dataIndex == 'region'">
                <span>
                    <!-- {{ text }} -->
                    {{ column.filters[record.region].text }}
                    <!-- {{ column.filters[text].text }} -->
                </span>
            </template>

            <template v-if="column.dataIndex == 'state'">
                <span>
                    <!-- {{ text }} -->
                    {{ column.filters[record.state].text }}
                    <!-- {{ column.filters[text].text }} -->
                </span>
            </template>
            <template v-else-if="column.dataIndex === 'operation'">
                <ModalUnityEdit :unityObj="record" @upDataTableData="updateHandle"></ModalUnityEdit>
                <!-- 删除 -->
                <a-popconfirm v-if="storeItem?.results.length" title="Sure to delete?" @confirm="onDelete(record._id)">
                    <a-button style="margin-top: 10px">Delete</a-button>
                </a-popconfirm>
            </template>
        </template>
    </a-table>
</template>
<script lang="ts">
import { TablePaginationConfig, TableProps, message } from 'ant-design-vue';
import { usePagination } from 'vue-request';
import { computed, defineComponent, reactive, ref, toRefs, watch } from 'vue';
import request from '../../../api/custom/custom-request';
import {
    APIResultForUnityType,
    APIParams,
    ItemStatus,
    UnityType,
    UnityStatus,
    UnityRegion,
    getTokenExpirationDate
} from '@/types';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons-vue';

// 组件
import ModalUnityCreate from './ModalUnityCreate.vue';
import ModalUnityEdit from './ModalUnityEdit.vue';
import useHeaderStore from '@/stores/header'

import useUserStore from '@/stores/user';


// // 俯视图组件  测绘 与 房产证
// import SurveyReport from '@/components/Other/topViewTool/'
// import PropertyOwnershipCertificate from '@/components/BaseData/UnitiesSystem/topViewTool/PropertyOwnershipCertificate/Home.vue'
// import { createStore, Commit } from 'vuex';



export default defineComponent({
    components: {
        SearchOutlined,
        FilterOutlined,
        ModalUnityCreate,
        ModalUnityEdit,
    },
    setup() {

        const userStore = useUserStore();
        const { token } = toRefs(userStore);
        const expirationDate = getTokenExpirationDate(token.value) as any
        if (expirationDate) {
            console.log(`Token 过期时间为：${expirationDate}`)
        } else {
            console.log('Token 无过期时间信息')
        }

        const date = new Date(expirationDate);

        const options = { timeZone: 'Asia/Shanghai', hour12: false };
        const dateString = date.toLocaleString('zh-CN', options);
        console.log("dateString", dateString); // 输出：2023/6/15 18:37:59


        const headerStore = useHeaderStore();
        const { companyCode } = toRefs(headerStore);
        const state = reactive({
            // 实现 自定义筛选 高亮功能
            searchText: '',
            searchedColumn: '',
        });

        const searchInput = ref<HTMLElement | any>(); // 获取 搜索框 的 DOM 控制，可通过它来修改搜索框的属性
        const columns = [
            {
                title: '单元编号',
                dataIndex: 'unityCode',
                key: 'unityCode!',
                width: '8%',
                fixed: 'left',
                customFilterDropdown: true,
                onFilterDropdownVisibleChange: (visible: any) => {
                    if (visible) {
                        // 表示 筛选框 是否可见，下拉菜单可见时，将焦点设置到搜索框中。
                        setTimeout(() => {
                            searchInput.value.focus();
                        }, 100);
                    }
                },
            },
            {
                title: '管理地区',
                dataIndex: 'region',
                filters: UnityRegion,
                width: '7%',
            },
            {
                title: '单元所属性质',
                dataIndex: 'state',
                width: '10%',
                filters: UnityStatus,
            },
            {
                title: '单元面积',
                dataIndex: 'unityArea',
                width: '6%',
            },
            {
                title: '分摊后面积',
                dataIndex: 'allocatedArea',
                width: '10%',
            },
            {
                title: '所属合同',
                dataIndex: 'contractItem',
            },
            {
                title: '是否被选入合同',
                dataIndex: 'selected',
            },
            {
                title: 'xy坐标',
                dataIndex: 'setTextPos',
                width: '7%',
            },
            {
                title: '角度',
                dataIndex: 'rotate',
                width: '5%',
            },
            {
                title: '备注',
                dataIndex: 'notes',
                // width: '5%'
            },
            {
                title: '操作',
                dataIndex: 'operation',
                width: '10%',
                fixed: 'right',
            },
        ];


        // window.location.href.split('/')[window.location.href.split('/').length-1]
        // --------------------- 分页
        const queryData = (params: APIParams) => {
            return request.get<APIResultForUnityType>(`/unities/?region[]=${companyCode.value}`, { params });
        };


        const {
            data: storeItem, // 与后端返回的数据 data中的 data 匹配
            run,
            loading,
            current,
            pageSize,
            total, // 与后端 返回的数据 data中的 total 值匹配, 表示 总数据量
            // totalPage  // 与后端 返回的数据 data中的 total 值匹配, 表示 总页数量
        } = usePagination(queryData, {
            formatResult: (res: any) => {
                console.log("res", res)
                return res.data as APIResultForUnityType
            },
            pagination: {
                // 最终会被组件自动分配给 【分页器】，因为分页器会以下面设定的值来发送  的query 的Url参数
                currentKey: 'current', // 要以后端 的变量匹配【当前页面数量】
                pageSizeKey: 'pageSize', // 要以后端 变量匹配 【当前页面显示多少数据】
                totalKey: 'total',
                totalPageKey: 'totalPage',
            },
        })

        // 从子组件 编辑单元 中获取数据，来更新表格中的响应式数据
        const upDataTableData = (val: UnityType) => {
            console.log("getData", val)
            console.log("storeItemstoreItem",storeItem.value)
            // storeItem.value?.results.push(val)
            const unityObj = storeItem.value?.results;
            
            console.log("val._id:",val._id);
            console.log("unityObj",unityObj);
            console.log("unityObj?.findIndex(item => item._id === val._id)",unityObj?.findIndex(item => item._id === val._id));
            // 如何替换指定id的内容
        }
        // watchEffect(()=>{

        //     run({})
        // })
        watch(
            () => companyCode.value,
            (val: any, _old: any) => {
                console.log("val", val)
                run({})
            })

        const pagination = computed(() => ({
            // 最终会被组件自动分配给 handleTableChange 的第一个参数
            total: total.value,
            current: current.value,
            pageSize: pageSize.value,
            searchText: state.searchText,
        }));

        // 当 handleSearch 被触发时， a-table的 @change 事件也会被触发。
        const handleTableChange: TableProps['onChange'] = (
            // 分页功能按钮,选项筛选功能 提交按钮 都可以出发 onChange事件
            pagination: TablePaginationConfig,
            filters: any, // 与前端 过滤组件 匹配, 通过前端提供的columns.filters 值的点击来触发将数据传入 run中请求后端数据
            sorter: any // 与前端 排序组件 匹配, 通过前端提供的columns.sorter 值的点击来触发将数据传入 run中请求后端数据
        ) => {
            console.log('### onChange 生效了');
            run({
                // 再次调用 queryData 来请求数据
                pageSize: pagination.pageSize!, // 匹配后端 ctx.query 中的 pageSize
                current: pagination.current, // 匹配后端 ctx.query 中的 current
                sortField: sorter.field, // 匹配后端 ctx.query 中的 sortField
                sortOrder: sorter.order, // 匹配后端 ctx.query 中的 sortOrder
                ...filters, // 与 columns中带有 filters的单元中 dataIndex中值匹配，比如 state, 请求时带对应选项值。 例如 state[] = 1
            });
        };

        // selectedKeys: 表示用户在搜索框中输入的搜索关键字，通常是一个数组，该数组的长度可能是 0，1，或者更多，具体取决于搜索框的类型和配置。
        // confirm: 表示用户点击搜索框中的确认按钮时应该执行的回调函数。该回调函数通常用于关闭搜索框的下拉菜单，并将用户输入的搜索关键字传递给表格组件。
        // dataIndex: 表示当前搜索框所在的列的 dataIndex 属性，通常用于标识表格数据中哪一列应该被搜索
        const handleSearch = (
            selectedKeys: string[],
            confirm: () => void,
            dataIndex: string
        ) => {
            // 点击搜索框
            confirm();
            state.searchText = selectedKeys[0]; // 填内容
            state.searchedColumn = dataIndex; // 填内容
        };

        // clearFilters 它用于清空当前表格中所有列的筛选条件。该函数通常是在重置搜索框时调用的
        const handleReset = (clearFilters: any) => {
            clearFilters({ confirm: true });
            state.searchText = '';
        };

        // ------------------- 下面是关于 创建、编辑相关功能函数

        const addTableDataToSource = (val:APIResultForUnityType) => {
            console.log("val:APIResultForUnityType",val);
            
        };

        const onDelete = (id: string) => {  // 需要登录权限才能删除

            // 接口数据请求，删除数据库中的数据
            request({
                // 初始化
                method: 'delete',
                url: '/unities/' + id,
            }).then((res: any) => {
                // 删除 缓存中的数据
                if (storeItem.value) {
                    storeItem.value.results = storeItem.value.results.filter(
                        (item) => item._id !== id
                    );
                }
                console.log(res);
                message.success("删除成功")
            }).catch(error => {
                message.error("删除失败:" + error)
            })
        };

        const updateHandle = (data: any) => {
            // 获取 dataSource 中 指定合同的对象，然后用 data去覆盖该对象的数据。
            console.log();
            if (storeItem?.value) {
                const index = storeItem?.value.results.findIndex(
                    (unity) => unity._id === data._id
                );
                if (index != -1) {
                    Object.assign(storeItem?.value.results[index], data ?? {});
                }
            }
        };

        // const getStaticFileContractIDItems = (id: string | undefined) => {
        //     if (id) {
        //         request({
        //             method: 'get',
        //             url: '/staticFileStore/forContractId/' + id
        //         }).then(res => {

        //             getStaticFiles.value = res.data.results.length
        //         }).catch(res => {

        //         })
        //     }
        // }
        return {
            storeItem,
            pagination,
            loading,
            columns,
            handleTableChange,
            ItemStatus,
            state,
            searchInput,
            handleSearch,
            handleReset,
            ...toRefs(state),
            // ------
            
            onDelete,
            updateHandle,
            headerStore,
            dateString,
            // getStaticFiles,
            // getStaticFileContractIDItems
            addTableDataToSource,
            upDataTableData
        };
    },
});
</script>

<style>
.unityTable {
    border: 1px solid gold;
}
</style>type TablePaginationConfigtype TablePropstype APIResultForUnityTypetype APIParamstype UnityType
