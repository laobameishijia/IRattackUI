<script setup>
import { ref} from 'vue'
import { useRouter } from 'vue-router';  // 引入 useRouter
import { useStore } from 'vuex';
import AppBreadcrumb from '@/layout/AppBreadcrumb.vue';

// 保存选中的目录路径
const directoryPath = ref('')
const selectedFilePath = ref('')
const router = useRouter();  // 获取 router 实例
const store = useStore();

// 创建 formData 对象
const formData = ref({
  directoryPath: '',
  selectedFilePath: '',
  compileOptions: '',
  attackModel: [],
  iterationCount: '',
  controlFlowStrategy: {
    random: '',
    all: '',
    bcf: '',
    flatten: ''
  }
})

const flattenLevel = ref('')
const bcfProbability = ref('')
const display = ref(false) // 控制弹窗显示的状态变量
// 选择目录函数
const selectDirectory = async () => {
  const { ipcRenderer } = require('electron')
  const path = await ipcRenderer.invoke('select-directory')
  if (path) {
    directoryPath.value = path
  }
}

const selectFile = async () => {
  const { ipcRenderer } = require('electron')
  const filePath = await ipcRenderer.invoke('select-file')
  if (filePath) {
    selectedFilePath.value = filePath
  }
}

function open() {
  display.value = true;
}

function close() {
  display.value = false;
  // 导航到下一个页面，并将 formData 作为参数传递
  router.push({ path: `/tasks`})
}

// 提交表单函数
const submitForm = (flattenLevel, bcfProbability) => {
  // 在这里可以处理表单数据，例如发送到服务器或打印到控制台
  // console.log(JSON.stringify(formData.value))
  if (flattenLevel.value != "") {
    formData.value.controlFlowStrategy.flatten = flattenLevel
  }
  if (bcfProbability.value != "") {
    formData.value.controlFlowStrategy.bcf = bcfProbability
  }
  console.log(JSON.stringify(formData.value))
  createNewTask(formData)
  open()

}

function formatTimestamp(date) {
  const pad = (num) => String(num).padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // 月份从0开始
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


// 创建任务对象
const createTaskData = (formData) => {
  const controlflowstr = Object.values(formData.controlFlowStrategy).filter(value => value).join('、');
  return {
    id: '',  // ID 由 TaskService 自动生成
    directory: formData.directoryPath,
    compilefile: formData.selectedFilePath,
    compileflags: formData.compileOptions,
    timestamp:  formatTimestamp(new Date()),  // 生成时间戳
    targetmodel: formData.attackModel.join('、'),
    iteration: formData.iterationCount,
    schedule: '0',
    controlflow: controlflowstr
  };
};

const createNewTask = async (formData) => {
  try {
    const taskData = createTaskData(formData.value);
    const createdTask = await store.dispatch('task/createTask', taskData); // 注意使用命名空间
    console.log('新任务创建成功:', createdTask);
  } catch (error) {
    console.error('创建任务失败:', error);
  }
};
  
const home = {
  icon: 'pi pi-home',
  route: '/initconfig'
};

const items = [
  { label: '初始化配置', route: '/initconfig'},
];

</script>

<template>
  <div class="flex flex-col md:flex-row gap-8">
    <div class="md:w-full">
      <app-breadcrumb :home="home" :items="items"></app-breadcrumb>
      <div class="card">
        <div class="font-semibold text-2xl mb-4">初始化配置</div>
        <div class="card flex justify-center">
          <Stepper value="1" class="basis-[50rem]">
            <StepList>
              <Step value="1">步骤1</Step>
              <Step value="2">步骤2</Step>
            </StepList>
            <StepPanels>
              <StepPanel v-slot="{ activateCallback }" value="1">
                <div class="flex flex-col h-100">
                  <Fluid>
                    <div class="card flex flex-col gap-4 w-full">
                      <div class="font-semibold text-xl">源码配置</div>
                      <div class="grid grid-cols-12 gap-2">
                        <label for="directoryPath"
                          class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0">源码目录指定：</label>
                        <div class="col-span-8 md:col-span-8"> <!-- 调整宽度 -->
                          <InputText id="directoryPath" type="text" :placeholder="directoryPath" />
                        </div>
                        <div class="col-span-2 md:col-span-2"> <!-- 调整宽度 -->
                          <Button :fluid="false" @click="selectDirectory" label="选择目录" />
                        </div>
                      </div>
                      <div class="grid grid-cols-12 gap-2">
                        <label for="selectedFilePath"
                          class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0">编译文件指定：</label>
                        <div class="col-span-8 md:col-span-8"> <!-- 调整宽度 -->
                          <InputText id="selectedFilePath" type="text" :placeholder="selectedFilePath" />
                        </div>
                        <div class="col-span-2 md:col-span-2"> <!-- 调整宽度 -->
                          <Button :fluid="false" @click="selectFile" label="选择文件" />
                        </div>
                      </div>
                      <div class="grid grid-cols-12 gap-2">
                        <label for="compileflag"
                          class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0">编译选项设定：</label>
                        <div class="col-span-4 md:col-span-4"> <!-- 调整宽度 -->
                          <InputText id="compileflag" type="text" v-model="formData.compileOptions" />
                        </div>
                      </div>
                    </div>
                  </Fluid>
                </div>

                <div class="flex pt-6 justify-end">
                  <Button label="下一步" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('2')" />
                </div>
              </StepPanel>
              <StepPanel v-slot="{ activateCallback }" value="2">
                <div class="flex flex-col h-100">
                  <div class="card flex flex-col gap-4 w-full"> <!-- 添加内边距 -->
                    <div class="font-semibold text-2xl mb-4">攻击方法配置</div> <!-- 修改字体大小和底部边距 -->
                    <div class="grid grid-cols-4 gap-6"> <!-- 调整列间距 -->
                      <!-- 攻击模型配置放在左边 -->
                      <div class="col-span-1 flex items-center">攻击模型指定：</div>
                      <!-- 模型在右边，分成两行 -->
                      <div class="col-span-3 grid grid-cols-3 gap-4">
                        <!-- 第一行模型 -->
                        <div class="flex items-center">
                          <Checkbox id="checkOption1" name="option" value="DGCNN_9" v-model="formData.attackModel" />
                          <label for="checkOption1" class="ml-2">DGCNN_9</label>
                        </div>
                        <div class="flex items-center">
                          <Checkbox id="checkOption2" name="option" value="DGCNN_20" v-model="formData.attackModel" />
                          <label for="checkOption2" class="ml-2">DGCNN_20</label>
                        </div>
                        <div class="flex items-center">
                          <Checkbox id="checkOption3" name="option" value="GIN0_9" v-model="formData.attackModel" />
                          <label for="checkOption3" class="ml-2">GIN0_9</label>
                        </div>
                        <!-- 第二行模型 -->
                        <div class="flex items-center">
                          <Checkbox id="checkOption4" name="option" value="GIN0_20" v-model="formData.attackModel" />
                          <label for="checkOption4" class="ml-2">GIN0_20</label>
                        </div>
                        <div class="flex items-center">
                          <Checkbox id="checkOption5" name="option" value="GIN0WithJK_9"
                            v-model="formData.attackModel" />
                          <label for="checkOption5" class="ml-2">GIN0WithJK_9</label>
                        </div>
                        <div class="flex items-center">
                          <Checkbox id="checkOption6" name="option" value="GIN0WithJK_20"
                            v-model="formData.attackModel" />
                          <label for="checkOption6" class="ml-2">GIN0WithJK_20</label>
                        </div>
                      </div>

                      <div class="col-span-1 flex items-center">迭代次数设定：</div>
                      <div class="col-span-3 flex items-center">
                        <InputText id="compileflag" type="text" placeholder="迭代次数设定"
                          v-model="formData.iterationCount" /> <!-- 使输入框宽度为全宽 -->
                      </div>


                      <div class="col-span-1 flex items-center">控制流变化策略配置：</div>
                      <!-- 模型在右边，分成两行 -->
                      <div class="col-span-3 grid grid-cols-2 gap-4">
                        <!-- 第一行模型 -->
                        <div class="flex items-center">
                          <Checkbox id="checkOption1" name="option" value="1"
                            v-model="formData.controlFlowStrategy.random" />
                          <label for="checkOption1" class="ml-2">全体基本块添加语义NOP指令</label>
                        </div>
                        <div class="flex items-center"></div>

                        <div class="flex items-center">
                          <Checkbox id="checkOption3" name="option" value="1"
                            v-model="formData.controlFlowStrategy.all" />
                          <label for="checkOption3" class="ml-2">随机挑选基本块添加随机语句NOP指令</label>
                        </div>
                        <div class="flex items-center"></div>

                        <!-- 第二行模型 -->
                        <div class="flex items-center">
                          <Checkbox id="checkOption4" name="option" value="-1"
                            v-model="formData.controlFlowStrategy.flatten" />
                          <label for="checkOption4" class="ml-2">随机挑选函数进行1或2或3等级的控制流平坦化</label>
                        </div>
                        <div class="flex items-center">
                          <InputText id="compileflag" type="text" placeholder="1 or 2 or 3" class="w-full"
                            v-model="flattenLevel" />
                        </div>

                        <div class="flex items-center">
                          <Checkbox id="checkOption4" name="option" value="-1"
                            v-model="formData.controlFlowStrategy.bcf" />
                          <label for="checkOption4" class="ml-2">随机挑选函数按照设定概率进行控制流虚假化</label>
                        </div>
                        <div class="flex items-center">
                          <InputText id="compileflag" type="text" placeholder="0~100%" class="w-full"
                            v-model="bcfProbability" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex pt-6 justify-between">
                  <Button label="上一步" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('1')" />
                  <Button label="完成" severity="success" @click="submitForm(flattenLevel, bcfProbability)" />
                </div>
              </StepPanel>
            </StepPanels>
          </Stepper>
        </div>
      </div>
    </div>
  </div>
  <!-- 配置成功弹窗 -->
  <Dialog header="配置成功" v-model:visible="display" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }"
    :modal="true">
    <p class="leading-normal m-0">
      您的配置已成功提交！
    </p>
    <template #footer>
      <Button label="确认" @click="close" />
    </template>
  </Dialog>
  <!-- <Dialog header="" :visible="showDialog" modal @hide="showDialog = false">
    <p>您的配置已成功提交！</p>
    <Button label="确定" icon="pi pi-check" @click="showDialog = false" />
  </Dialog> -->
</template>
