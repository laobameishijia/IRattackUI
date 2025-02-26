<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
const { join, basename } = require('path');
const store = useStore();
const route = useRoute();
const taskId = route.params.id;  // 获取任务 ID
const samples = ref();
let taskdata

async function fetchData() {
    taskdata = await store.dispatch('task/getTasks')
    let taskId_ = parseInt(taskId, 10) - 1;
    const modelDirectory = join(taskdata[taskId_].directory, "out");
    const modelFilesList = await readFileList(modelDirectory);
    return modelFilesList
};

// 组合式 API 示例
onMounted(async () => {
  const data = await fetchData();
  // 更新数据
  console.log(data)
  samples.value = data
  console.log(samples)
});

const readFileList = async (directoryPath) => {
    const { ipcRenderer } = require('electron')
    const fileList = await ipcRenderer.invoke('get-files-in-directory', directoryPath)
    return fileList
}

const readFile = async (filePath) => {
    const { ipcRenderer } = require('electron')
    const data = await ipcRenderer.invoke('read-text-file', filePath)
    console.log(data)
}

</script>

<template>
    <div class="card">
        <h2>攻击过程详情 - 任务 ID: {{ taskId }}</h2>
        <DataTable :value="samples" paginator :rows="10">
            <Column header="序号" field="id"></Column>
            <Column header="迭代次数" field="iteration"></Column>
            <Column header="目标模型" field="targetmodel"></Column>
            <Column header="对抗置信度" field="advconfidence"></Column>
            <Column header="产生时间" field="timestamp"></Column>

            <Column header="控制流变化文件" class="w-24 !text-end">
                <template #body="{ data }">
                    <Button icon="pi pi-search" @click="" severity="secondary" rounded>
                    </Button>
                </template>
            </Column>

            <Column header="下载" class="w-24 !text-end">
                <template #body="{ data }">
                    <Button icon="pi pi-download" @click="" severity="secondary" rounded>
                    </Button>
                </template>
            </Column>

            <!-- 查看攻击样本 -->
            <Column header="删除" class="w-24 !text-end">
                <template #body="{ data }">
                    <Button icon="pi pi-trash" @click="" severity="secondary" rounded>
                    </Button>
                </template>
            </Column>

        </DataTable>
    </div>
</template>
