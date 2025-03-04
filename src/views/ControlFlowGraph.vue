<template>
    <div class="card flex gap-32">
        <div class="w-1/5">
            <h2 class="title">函数列表: {{ samplesPath }}</h2>
            <Listbox :options="functionList" optionLabel="name" @change="showImage" style="width: 100%" />
        </div>
        <div class="w-2/3 flex justify-center items-center" v-if="currentImage">
            <Image :src="currentImage" alt="Function Image" class="" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
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
    const dirPath = '/home/lebron/IRFuzz/Test/28/images/original';
    const functions = await ipcRenderer.invoke('get-images', dirPath);
    functionList.value = Object.keys(functions).map(name => ({ name, image: functions[name] }));
});
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
}
</style>