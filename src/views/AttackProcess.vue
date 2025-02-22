<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const taskId = route.params.id;  // 获取任务 ID
</script>

<template>
    
    <div class="card">
        <h2>攻击过程详情 - 任务 ID: {{ taskId }}</h2>
        <DataTable :value="samples" tableStyle="min-width: 50rem">
            <Column header="序号" field="id"></Column>
            <Column header="迭代次数" field="directory"></Column>
            <Column header="产生时间" field="compilefile"></Column>
            <Column header="对抗置信度" field="compileflags"></Column>
            <Column header="控制流变化文件" field="targetmodel"></Column>
            
            <!-- 查看攻击过程 -->
            <Column header="下载" class="w-24 !text-end">
                <template #body="{ data }">
                    <Button icon="pi pi-search" @click="viewAttackProcess(data.id)" severity="secondary" rounded>
                    </Button>
                </template>
            </Column>

            <!-- 查看攻击样本 -->
            <Column header="删除" class="w-24 !text-end">
                <template #body="{ data }">
                    <Button icon="pi pi-search" @click="viewAttackSample(data.id)" severity="secondary" rounded>
                    </Button>
                </template>
            </Column>

        </DataTable>
    </div>
</template>

