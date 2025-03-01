import InitConfig from '@/views/InitConfig.vue';
import Tasks from '@/views/Tasks.vue';
import AttackProcess from '@/views/AttackProcess.vue';
import AttackSample from '@/views/AttackSample.vue';
import ControlFlowGraph from  '@/views/ControlFlowGraph.vue'

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: InitConfig,
        },
        {
            path: '/initconfig',
            component: InitConfig,
        },
        {
            path: '/tasks', 
            component: Tasks
        },
        { 
            path: '/controlflowgraph', 
            component: ControlFlowGraph 
        },
        { 
            path: '/attack-sample/:id', 
            component: AttackSample 
        },
        { 
            path: '/attack-process/:id', 
            component: AttackProcess 
        }
    ]
});

export default router;
