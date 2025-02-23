<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { SampleService } from '@/service/SampleService';
const route = useRoute();
const taskId = route.params.id;  // 获取任务 ID
const samples = ref();

onMounted(() => {
    SampleService.getSamples(taskId).then((data) => (samples.value = data));
    console.log(samples)
    readFileList()
    readFile()
});

const readFileList = async () => {
  const { ipcRenderer } = require('electron')
  const directoryPath = "F:\\研三上\\毕业论文\\图表"; //Bogus.txt
  const filePath = await ipcRenderer.invoke('get-files-in-directory',directoryPath )
  console.log(filePath)
}

const readFile = async () => {
  const { ipcRenderer } = require('electron')
  const filePath = "F:\\研三上\\毕业论文\\图表\\Bogus.txt"; //
  const data = await ipcRenderer.invoke('read-text-file',filePath )
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
            <Column header="对抗置信度" field="advconfidence"></Column>

            <Column header="控制流变化文件" class="w-24 !text-end">
                <template #body="{ data }">
                    <Button icon="pi pi-search" @click="viewAttackProcess(data.id)" severity="secondary" rounded>
                    </Button>
                </template>
            </Column>

            <Column header="下载" class="w-24 !text-end">
                <template #body="{ data }">
                    <Button icon="pi pi-download" @click="viewAttackProcess(data.id)" severity="secondary" rounded>
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
