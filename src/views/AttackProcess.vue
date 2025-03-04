<script setup>
import { useRoute } from 'vue-router';
import { useLayout } from '@/layout/composables/layout';
import { onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

const route = useRoute();
const taskId = route.params.id;  // 获取任务 ID

const lineData = ref('');
const lineOptions = ref('');

const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--text-color');
const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

const value = ref(0);

lineData.value = {
    labels: '',
    // data[0].targetmodel.split("、")
    datasets: [
        {
            label: 'First Dataset',//模型名
            data: [65, 59, 80, 81, 56, 55, 40],//置信度
            fill: false,
            backgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
            borderColor: documentStyle.getPropertyValue('--p-primary-500'),
            tension: 0.4
        },
        {
            label: 'Second Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
            borderColor: documentStyle.getPropertyValue('--p-primary-500'),
            tension: 0.4
        }
    ]
};
lineOptions.value = {
    plugins: {
        legend: {
            labels: {
                fontColor: textColor
            }
        }
    },
    scales: {
        x: {
            title: {
                display: true,
                text: '迭代次数', // 横坐标表示
                color: textColorSecondary
            },
            ticks: {
                color: textColorSecondary
            },
            grid: {
                color: surfaceBorder,
                drawBorder: false
            }
        },
        y: {
            title: {
                display: true,
                text: '对抗置信度', // 横坐标表示
                color: textColorSecondary
            },
            ticks: {
                color: textColorSecondary
            },
            grid: {
                color: surfaceBorder,
                drawBorder: false
            }
        }
    }
};


onMounted(() => {
    fetchData()
});

function calculate_value(uidata) {

    // 计算第一个值
    const value1 = Math.round((uidata.current_iteration / uidata.all_iteration) * 100 * 10) / 10

    // 计算第二个值
    let modelCount30 = 0;
    let modelCountOver0_5 = 0;

    for (const key in uidata.confidence) {
        if (uidata.confidence[key].length === 30) {
            modelCount30++;
        }
        if (uidata.confidence[key].some(conf => conf > 0.5)) {
            modelCountOver0_5++;
        }
    }
    const value2 = Math.round(((modelCount30 + modelCountOver0_5) / 6) * 100 * 10) / 10;

    // 取两个值中的最大值
    return Math.max(value1, value2);
}

function fetchData() {
    store.dispatch('task/getTasks').then(async data => {
        let taskId_ = parseInt(taskId, 10) - 1;
        const targetModels = data[taskId_].targetmodel.split('、')
        const iterations = parseInt(data[taskId_].iteration, 10)
        const uidata = await getuiData(data[taskId_].directory + "/uidata.json")
        value.value = calculate_value(uidata)
        // 创建 labels
        lineData.value.labels = Array.from({ length: iterations }, (v, k) => k + 1);
        // 创建 datasets
        lineData.value.datasets = targetModels.map((model, index) => ({
            label: model,
            data: Array.isArray(uidata.confidence[model]) ? uidata.confidence[model] : [uidata.confidence[model]],
            fill: false,
            backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
            borderColor: `hsl(${index * 60}, 70%, 50%)`,
            tension: 0.4
        }));
    }).catch(error => {
        console.error('Error fetching tasks:', error);
    });
}

function getuiData(path) {
    const { ipcRenderer } = require('electron')
    const uidata = ipcRenderer.invoke('read-ui-json-file', path)
    if (uidata) {
        return uidata
    } else {
        console.log("读取ui数据失败")
    }
}


</script>

<template>
    <div class="card">
        <h2 class="title">攻击过程详情 - 任务 ID: {{ taskId }}</h2>
        <div class="font-semibold text-xl mb-4">完成进度</div>
        <div class="flex flex-col md:flex-row mb-4">
            <div class="w-full">
                <ProgressBar :value="value"></ProgressBar>
            </div>
        </div>
        <div class="col-span-12 xl:col-span-6">
            <div class="font-semibold text-xl mb-4">对抗置信度变化</div>
            <Chart type="line" :data="lineData" :options="lineOptions"></Chart>
        </div>
    </div>
</template>


<style scoped>
.title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
}
</style>