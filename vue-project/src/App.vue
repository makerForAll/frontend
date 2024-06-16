<template>
  <a-layout>
  <RouterView /> <!-- 默认 -->
   <a-layout>
     <RouterView name="SiderBar" />
     <a-layout style="padding: 0 24px 24px">
               <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
                   <RouterView name="MainContainer" />
               </a-layout-content>
           </a-layout>
   </a-layout>
 </a-layout>
</template>
<script setup lang="ts">

</script>
<style>
.layout {
   background: lightblue;
   display: flex;
   justify-content: center;
   position: fixed;
   width: 100%;
   height: 100%;
}
</style>