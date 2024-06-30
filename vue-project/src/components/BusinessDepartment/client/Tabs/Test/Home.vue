<template>
    <div>
123
    </div>
</template>

<script setup lang="ts">
import {usePartyStore }from '@/stores/party'
import { onMounted } from 'vue';

const partyStore = usePartyStore();

onMounted(()=>{
    
    // partyStore.readParty();
    console.log("测试");
})
</script>

<style scoped>

</style>