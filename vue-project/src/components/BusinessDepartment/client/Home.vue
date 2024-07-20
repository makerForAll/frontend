<template>
      <div>
            <TabsSlotView>
                  <template #1-header>
                       
                  </template>
                  <template #1-container>
                        <ReadClientView>
                              <template #headerHandle>
                                    <CreateClientView></CreateClientView>
                              </template>
                              <template #operations>
                                    <UpdateClientView></UpdateClientView>
                                    <DeleteClientView></DeleteClientView>
                                
                                    <ReadPlanView>
                                     <template #header>
                                          <CreatePlanView></CreatePlanView>
                                     </template> 
                                     <template #operations>
                                          <DeletePlanView></DeletePlanView>
                                    </template>
                                     </ReadPlanView>
                              </template>
                        </ReadClientView>  
                  </template>
                  <template #2-container>
                        2-
                  </template>
                  <template #3-container>
                        3-
                  </template>
                  <template #4-container>
                        4-
                  </template>
            </TabsSlotView>
        
      </div>
</template>

<script setup lang="ts">
// 主板-插槽  【Tab 插槽板】
import TabsSlotView from '@/cp-v1/cp-MB/Tabs/TabsSlot.vue' // 优化掉

// cp-projectCP 配置你要的 配件
import CreateClientView from '@/cp-projectCP/ClientHome/CreateClient/Home5.vue';

// 小主板-插槽  【表格 插槽板】
import ReadClientView from '@/cp-projectCP/ClientHome/ReadClient/0101.vue';// 优化掉

// cp-projectCP 配置你要的 配件
import UpdateClientView from '@/cp-projectCP/ClientHome/UpdateClient/Home3.vue';
import DeleteClientView from '@/cp-projectCP/ClientHome/DeleteClient/Home.vue';

// 主板-插槽 【抽屉 插槽板】
// import DrawerSlotView from '@/cp-v1/cp-MB/Drawer/DrawerSlot.vue';
// import ReadPlanView from '@/cp-v1/cp-ReadMB-data/Drawer/0101.vue';
import ReadPlanView from '@/cp-projectCP/PlanHome/ReadPlan/Home.vue';

// cp-projectCP 配置你要的 配件
import CreatePlanView from '@/cp-projectCP/PlanHome/CreatePlan/Home2.vue';
// import ReadPlanView from '@/cp-projectCP/ClientHome/PlanHome/ReadPlan/Home3.vue';
import DeletePlanView from '@/cp-projectCP/PlanHome/DeletePlan/Home.vue';
// import dateView from '@/cp-v1/cp-GCP/Drawer/date.vue'

</script>
<style scoped></style>