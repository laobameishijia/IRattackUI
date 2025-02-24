import { createStore } from 'vuex';



// store/modules/task.js
const state = () => ({
  tasks: [
    {
      id: '1',
      directory: '/home/lebron/IRFuzz/ELF/14',
      compilefile: 'compile.sh',
      compileflags: '',
      timestamp: '2025-02-21 18:48:00',
      targetmodel: 'DGCNN_9、GIN0_9、DGCNN_20、DGCNN_9、GIN0_9、DGCNN_20',
      iteration: '30',
      schedule: '100',
      controlflow: 'all'
    },
    {
      id: '2',
      directory: '/home/lebron/IRFuzz/ELF/256',
      compilefile: 'compile.sh',
      compileflags: '-L /usr/local/lib -lssh',
      timestamp: '2025-01-21 17:11:00',
      targetmodel: 'GIN0_9',
      iteration: '60',
      schedule: '100',
      controlflow: 'all'
    },
    {
      id: '3',
      directory: '/home/lebron/IRFuzz/ELF/65',
      compilefile: 'compile.sh',
      compileflags: '-lpthread',
      timestamp: '2025-01-13 11:33:00',
      targetmodel: 'GIN0_20',
      iteration: '60',
      schedule: '100',
      controlflow: 'all'
    },
    {
      id: '4',
      directory: '/home/lebron/IRFuzz/ELF/355',
      compilefile: 'compile.sh',
      compileflags: '-lm -lpthread',
      timestamp: '2025-02-19 08:14:00',
      targetmodel: 'GIN0WithJK_20',
      iteration: '50',
      schedule: '100',
      controlflow: 'all'
    },
    {
      id: '5',
      directory: '/home/lebron/IRFuzz/ELF/415',
      compilefile: 'compile.sh',
      compileflags: '-lm -lpthread',
      timestamp: '2025-01-02 14:52:00',
      targetmodel: 'GIN0WithJK_20',
      iteration: '50',
      schedule: '100',
      controlflow: 'all'
    },
  ],
});

const mutations = {
  ADD_TASK(state, task) {
    task.id = String(state.tasks.length + 1);
    state.tasks.push(task);
  }
};

const actions = {
  createTask({ commit }, task) {
    commit('ADD_TASK', task);
    return task
  },
  getTasks({ state }) {
    return state.tasks;
  }
};

const getters = {
  tasks: (state) => state.tasks
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
