<template>
    <a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="onDelete(record.key)">
        <a>Delete</a>
    </a-popconfirm>
</template>

<script setup lang="ts">
    const onDelete = (key: string) => {
  dataSource.value = dataSource.value.filter(item => item.key !== key);
};
</script>

<style scoped></style>