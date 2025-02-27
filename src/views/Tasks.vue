<script setup>
import { ref, onMounted,computed } from 'vue';
import { useRouter } from 'vue-router';  // 引入 useRouter
import { useStore } from 'vuex';

const router = useRouter();  // 获取 router 实例
const totalRecords = ref(0);
const store = useStore();
const tasks = computed(() => store.getters['task/tasks']);

onMounted(() => {
    
});

// 跳转到查看攻击过程页面
const viewAttackProcess = (taskId) => {
    router.push({ path: `/attack-process/${taskId}` });
};

// 跳转到查看攻击样本页面
const viewAttackSample = (taskId) => {
    router.push({ path: `/attack-sample/${taskId}` });
};

</script>

<template>
    <div class="card">
        <DataTable :value=tasks paginator :rows="5">
            <Column header="任务编号" field="id" style="width: 5%"></Column>
            <Column header="程序源码目录指定" field="directory" style="width: 15% "></Column>
            <Column header="程序编译文件指定" field="compilefile" style="width: 10%"></Column>
            <Column header="创建时间" field="timestamp" style="width: 15%"></Column>
            <Column header="编译选项设定" field="compileflags" style="width: 10%"></Column>
            <Column header="攻击模型" field="targetmodel" style="width: 20%"></Column>
            <Column header="进度" field="schedule" style="width: 10%">
                <template #body="{ data }">
                    <Button :severity="data.schedule === '100' ? 'success' : 'info'">
                        {{ data.schedule === '100' ? '已完成' : '进行中' }}
                    </Button>
                </template>    
            </Column>

            <!-- 查看攻击过程 -->
            <Column header="查看攻击过程" class="w-24 !text-end" style="width: 5%">
                <template #body="{ data }">
                    <Button icon="pi pi-search" @click="viewAttackProcess(data.id)" severity="secondary" rounded>
                    </Button>
                </template>
            </Column>

            <!-- 查看攻击样本 -->
            <Column header="查看攻击样本" class="w-24 !text-end" style="width: 5%">
                <template #body="{ data }">
                    <Button icon="pi pi-search" @click="viewAttackSample(data.id)" severity="secondary" rounded>
                    </Button>
                </template>
            </Column>

        </DataTable>
    </div>
</template>
