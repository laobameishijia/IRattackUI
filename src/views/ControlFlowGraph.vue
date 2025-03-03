<template>
    <div class="card flex items-center">
        <div class="w-1/3">
            <Listbox :options="functions" optionLabel="name" @change="showImage" style="width: 100%" />
        </div>
        <div class="w-2/3 flex justify-center items-center" v-if="currentImage">
            <Image :src="currentImage" alt="Function Image" class="max-w-full h-auto" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const { ipcRenderer } = require('electron');

const functions = ref([]);
const currentImage = ref(null);

const showImage = (event) => {
    const selectedFunction = event.value;
    if (selectedFunction) {
        currentImage.value = selectedFunction.image;
    }
};

onMounted(async () => {
    const dirPath = 'path/to/your/images';
    const images = await ipcRenderer.invoke('get-images', dirPath);
    functions.value = images.map((image, index) => ({ name: `Function${index + 1}`, image }));
});
</script>