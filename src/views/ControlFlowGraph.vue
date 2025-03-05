<template>
    <app-breadcrumb :home="home" :items="items"></app-breadcrumb>
    <h2 class="title">函数列表: {{ dirname(imagePath) }}</h2>
    <div class="card flex gap-32">
        <div class="w-1/5">
            <Listbox :options="functionList" optionLabel="name" @change="showImage" style="width: 100%" />
        </div>
        <div class="w-2/3 flex justify-center items-center" v-if="currentImage">
            <Image :src="currentImage" alt="Function Image" class="" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter} from 'vue-router';
import AppBreadcrumb from '@/layout/AppBreadcrumb.vue';

const route = useRoute();
const router = useRouter();  // 获取 router 实例
const { dirname } = require('path');
const  imagePath = route.query.imagePath;
console.log(imagePath)

const { ipcRenderer } = require('electron');

const functionList = ref([]);
const currentImage = ref(null);

const showImage = (event) => {
    const selectedFunction = event.value;
    console.log(selectedFunction.image)
    if (selectedFunction) {
        currentImage.value = `file://${selectedFunction.image}`;;
    }
};

onMounted(async () => {
    const functions = await ipcRenderer.invoke('get-images', imagePath);
    functionList.value = Object.keys(functions).map(name => ({ name, image: functions[name] }));
});

const home = {
    icon: 'pi pi-home',
    route: '/initconfig'
};

const items = [
    { label: '任务详情', route: '/tasks' },
    { label: '攻击样本展示', goBack: true},
    { label: '中间语言控制流图展示' },
];
</script>

<style scoped>
.list-box {
    position: fixed;
    /* 固定位置 */
    top: 0;
    left: 0;
    width: 33.33%;
    /* 确保列表占据1/3的宽度 */
    margin-right: 2rem;
    /* 添加一些右边距 */
}

.title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
    background-color: white;
}
</style>