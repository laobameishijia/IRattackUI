<template>
    <div>
        <h2>对抗攻击系统</h2>
        <button @click="uploadFiles">上传并检测</button>
        <div v-if="result">
            <h3>检测结果</h3>
            <ul>
                <li v-for="(probability, model) in result" :key="model">
                    {{ model }}: {{ probability }}
                </li>
            </ul>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

const result = ref()

const detect = async (filePath) => {
    console.log("filePath",filePath)
    const { ipcRenderer } = require('electron')
    const response = await ipcRenderer.invoke('detect-file', filePath)
    return response
}

const selectFile = async () => {
  const { ipcRenderer } = require('electron')
  const filePath = await ipcRenderer.invoke('select-file')
  return filePath
}

const uploadFiles = async () => {
    let filePath = await selectFile()
    console.log(filePath)
    let res = await detect(filePath)
    console.log(res)
    return res
};
</script>
  