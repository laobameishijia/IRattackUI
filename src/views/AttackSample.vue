<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
const { join, basename } = require('path');
const store = useStore();
const route = useRoute();
const taskId = route.params.id;  // 获取任务 ID
const samples = ref();
const display = ref(false);
const dialogContent = ref('');
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
    let isAsc = true
    samples.value = data.sort((a, b) => {
        // 第二优先级比较：modelName
        const modelCompare = a.targetmodel.localeCompare(b.targetmodel)
        if (modelCompare != 0) return isAsc ? modelCompare : -modelCompare
        // 第一优先级比较：id
        const idCompare = a.iteration - b.iteration
        if (idCompare !== 0) return isAsc ? idCompare : -idCompare
    })
    // 重新调整 ID 从 1 开始递增
    samples.value.forEach((item, index) => {
        item.id = index + 1;
    });
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
    return data
}

const openDialog = async (path) => {
    const filedata = await readFile(path)
    dialogContent.value = filedata;
    display.value = true;
}

const closeDialog = () => {
    display.value = false;
}

</script>

<template>
    <div class="card">
        <h2 class="title">攻击过程详情 - 任务 ID: {{ taskId }}</h2>
        <h3 class="table-title">攻击样本表格</h3>
        <DataTable :value="samples" paginator :rows="10">
            <Column header="序号" field="id" style="width: 6%"></Column>
            <Column header="迭代次数" field="iteration" style="width: 10%"></Column>
            <Column header="目标模型" field="targetmodel" style="width: 15%"></Column>
            <Column header="对抗置信度" field="advconfidence" style="width: 15%"></Column>
            <Column header="产生时间" field="timestamp" style="width: 15%"></Column>

            <Column header="控制流变化种子文件预览" class="w-24 !text-end" style="width: 12%">
                <template #body="{ data }">
                    <Button icon="pi pi-search" @click="openDialog(data.path)" severity="secondary" rounded>
                    </Button>
                </template>
            </Column>

            <Column header="中间语言控制流图" class="w-24 !text-end" style="width: 10%">
                <template #body="{ data }">
                    <Button icon="pi pi-search" @click="openDialog(data.path)" severity="secondary" rounded>
                    </Button>
                </template>
            </Column>

            <Column header="下载" class="w-24 !text-end" style="width: 3%">
                <template #body="{ data }">
                    <Button icon="pi pi-download" @click="" severity="secondary" rounded>
                    </Button>
                </template>
            </Column>

            <!-- 查看攻击样本 -->
            <Column header="删除" class="w-24 !text-end" style="width: 3%">
                <template #body="{ data }">
                    <Button icon="pi pi-trash" @click="" severity="secondary" rounded>
                    </Button>
                </template>
            </Column>


            <!-- 弹窗部分 -->
            <Dialog header="控制流变化种子文件" v-model:visible="display" :breakpoints="{ '960px': '75vw' }" :style="{ width: '60vw' }"
                :modal="true">
                <p class="dialog-content">
                    {{ dialogContent }}
                </p>
                <template #footer>
                    <Button label="Close" @click="closeDialog" />
                </template>
            </Dialog>
        </DataTable>
    </div>
</template>


<style scoped>
.dialog-content {
    white-space: pre-wrap;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

.table-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>