<script setup>
import { useRoute } from 'vue-router';
import { useLayout } from '@/layout/composables/layout';
import { onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

const route = useRoute();
const taskId = route.params.id;  // 获取任务 ID
const tasksdata = ref('');

const lineData = ref('');
const lineOptions = ref('');
let length_ = 0;

const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--text-color');
const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


const value = ref(0);
let interval = null;
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


store.dispatch('task/getTasks').then(data => {
    tasksdata.value = data
    length_ = parseInt(tasksdata.value[0].iteration, 10)
    console.log(length_); // length是30
    startProgress();
    lineData.value.labels = Array.from({ length:  length_}, (v, k) => k + 1)
}).catch(error => {
    console.error('Error fetching tasks:', error);
});

console.log(lineData.value);

onMounted(() => {

});


function startProgress() {
    interval = setInterval(() => {
        let newValue = value.value + Math.floor(Math.random() * 10) + 1;
        if (newValue >= 100) {
            newValue = 100;
        }
        value.value = newValue;
    }, 2000);
}


function fetchData() {
    store.dispatch('task/getTasks').then(data => {
        const targetModels = data[0].targetmodel.split('、');
        const iterations = parseInt(data[0].iteration, 10);

        // 创建 labels
        lineData.value.labels = Array.from({ length: iterations }, (v, k) => k + 1);

        // 创建 datasets
        lineData.value.datasets = targetModels.map((model, index) => ({
            label: model,
            data: Array.from({ length: iterations }, () => Math.floor(Math.random() * 100)), // 假数据，替换为真实数据
            fill: false,
            backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
            borderColor: `hsl(${index * 60}, 70%, 50%)`,
            tension: 0.4
        }));
    }).catch(error => {
        console.error('Error fetching tasks:', error);
    });
}
</script>

<template>

    <div class="card">
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
