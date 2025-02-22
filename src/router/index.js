import InitConfig from '@/views/InitConfig.vue';
import APP from '@/App.vue'
import Tasks from '@/views/Tasks.vue';
import AttackProcess from '@/views/AttackProcess.vue';
import AttackSample from '@/views/AttackSample.vue';

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: APP,
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
