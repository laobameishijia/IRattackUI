<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore();

const route = useRoute();
const taskId = route.params.id;  // 获取任务 ID
const samples = ref({});

onMounted(() => {
    store.dispatch('task/getTasks').then(data => {
        let taskId_ = parseInt(taskId, 10);
        const targetModels = data[taskId_].targetmodel.split('、');
        targetModels.forEach(model => {
            const modelDirectory = join(data[taskId_].directory, model);
            const modelFilesList = readFileList(modelDirectory);
            samples.value = { ...samples.value, ...modelFilesList };
        });
        value.value = Math.ceil(uidata.current_iteration / uidata.all_iteration)

    }).catch(error => {
        console.error('Error fetching tasks:', error);
    });
    readFile()
});

const readFileList = async (directoryPath) => {
    const { ipcRenderer } = require('electron')
    const fileList = await ipcRenderer.invoke('get-files-in-directory', directoryPath)
    console.log(fileList)
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
        <DataTable :value="samples" tableStyle="min-width: 50rem">
            <Column header="序号" field="id"></Column>
            <Column header="迭代次数" field="iteration"></Column>
            <Column header="产生时间" field="timestamp"></Column>
            <Column header="目标模型" field="targetmodel"></Column>
            <Column header="对抗置信度" field="advconfidence"></Column>


            <Column header="控制流变化文件" class="w-24 !text-end">
                <template #body="{ data }">
                    <Button icon="pi pi-search" @click="viewAttackSample(data.id)" severity="secondary" rounded>
                    </Button>
                </template>
            </Column>

            <Column header="下载" class="w-24 !text-end">
                <template #body="{ data }">
                    <Button icon="pi pi-download" @click="viewAttackSample(data.id)" severity="secondary" rounded>
                    </Button>
                </template>
            </Column>

            <!-- 查看攻击样本 -->
            <Column header="删除" class="w-24 !text-end">
                <template #body="{ data }">
                    <Button icon="pi pi-trash" @click="viewAttackSample(data.id)" severity="secondary" rounded>
                    </Button>
                </template>
            </Column>

        </DataTable>
    </div>
</template>
