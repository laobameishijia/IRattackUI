import { ref } from 'vue';

export const TaskService = {
    tasksData: ref([
        {
            id: '1',
            directory:'/home/lebron/IRFuzz/ELF/14',
            compilefile:'compile.sh',
            compileflags:'',
            timestamp:'2025-02-21 18:48:00',
            targetmodel:'DGCNN_9、GIN0_9、DGCNN_20、DGCNN_9、GIN0_9、DGCNN_20',
            iteration:'30',
            controlflow:'all'
        },
        {
            id: '2',
            directory:'/home/lebron/IRFuzz/ELF/256',
            compilefile:'compile.sh',
            compileflags:'-L /usr/local/lib -lssh',
            timestamp:'2025-01-21 17:11:00',
            targetmodel:'GIN0_9',
            iteration:'60',
            controlflow:'all'
        },
        {
            id: '3',
            directory:'/home/lebron/IRFuzz/ELF/65',
            compilefile:'compile.sh',
            compileflags:'-lpthread',
            timestamp:'2025-01-13 11:33:00',
            targetmodel:'GIN0_20',
            iteration:'60',
            controlflow:'all'
        },
        {
            id: '4',
            directory:'/home/lebron/IRFuzz/ELF/355',
            compilefile:'compile.sh',
            compileflags:'-lm -lpthread',
            timestamp:'2025-02-19 08:14:00',
            targetmodel:'GIN0WithJK_20',
            iteration:'50',
            controlflow:'all'
        },
        {
            id: '5',
            directory:'/home/lebron/IRFuzz/ELF/415',
            compilefile:'compile.sh',
            compileflags:'-lm -lpthread',
            timestamp:'2025-01-02 14:52:00',
            targetmodel:'GIN0WithJK_20',
            iteration:'50',
            controlflow:'all'
        },
    ]),

    getTasks() {
        return Promise.resolve(this.tasksData.value);
    },

    createTask(task) {
        task.id = String(this.tasksData.value.length + 1); // 自动生成任务 ID
        task.timestamp = new Date().toISOString(); // 自动生成时间戳
        this.tasksData.value.push(task); // 将新任务添加到任务列表
        return Promise.resolve(task);
    },
}
