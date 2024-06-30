<template>
      <div>
            <TabsSlotView>
                  <template #1-header>
                        <CreateClientView></CreateClientView>
                  </template>
                  <template #1-container>
                        <ReadClientView>
                              <template #operations-chlid>
                                    <UpdateClientView></UpdateClientView>
                                    <DeleteClientView></DeleteClientView>
                                
                                    <DrawerSlotView>
                                     <template #create>
                                          <CreatePlanView>

                                          </CreatePlanView>
                                     </template> 
                                     <template #read>
                                          2
                                    </template>
                                     </DrawerSlotView>
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
import TabsSlotView from '@/cp-v1/cp-MB/Tabs/TabsSlot.vue'

// cp-projectCP 配置你要的 配件
import CreateClientView from '@/cp-projectCP/ClientHome/CreateClient/Home3.vue';

// 小主板-插槽  【表格 插槽板】
import ReadClientView from '@/cp-projectCP/ClientHome/ReadClient/Home2.vue';

// cp-projectCP 配置你要的 配件
import UpdateClientView from '@/cp-projectCP/ClientHome/UpdateClient/Home3.vue';
import DeleteClientView from '@/cp-projectCP/ClientHome/DeleteClient/Home.vue';

// 主板-插槽 【抽屉 插槽板】
import DrawerSlotView from '@/cp-v1/cp-MB/Drawer/DrawerSlot.vue';

// cp-projectCP 配置你要的 配件
import CreatePlanView from '@/cp-projectCP/ClientHome/PlanHome/CreatePlan/Home2.vue';


</script>
<style scoped></style>