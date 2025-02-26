import { createStore } from 'vuex';



// store/modules/task.js
const state = () => ({
  tasks: [
    {
      id: '1',
      directory: '/home/lebron/IRFuzz/Test/28',
      compilefile: 'compile.sh',
      compileflags: '',
      timestamp: '2025-02-21 18:48:00',
      targetmodel: 'DGCNN_9、DGCNN_20、GIN0_9、GIN0_20、GIN0WithJK_9、GIN0WithJK_20',
      iteration: '30',
      schedule: '100',
      controlflow: 'all'
    },
    {
      id: '2',
      directory: '/home/lebron/IRFuzz/Test/50',
      compilefile: 'compile.sh',
      compileflags: '-L /usr/local/lib -lssh',
      timestamp: '2025-01-21 17:11:00',
      targetmodel: 'DGCNN_9、DGCNN_20、GIN0_9、GIN0_20、GIN0WithJK_9、GIN0WithJK_20',
      iteration: '60',
      schedule: '100',
      controlflow: 'all'
    },
    {
      id: '3',
      directory: '/home/lebron/IRFuzz/Test/87',
      compilefile: 'compile.sh',
      compileflags: '-lpthread',
      timestamp: '2025-01-13 11:33:00',
      targetmodel: 'DGCNN_9、DGCNN_20、GIN0_9、GIN0_20、GIN0WithJK_9、GIN0WithJK_20',
      iteration: '60',
      schedule: '100',
      controlflow: 'all'
    },
    {
      id: '4',
      directory: '/home/lebron/IRFuzz/Test/92',
      compilefile: 'compile.sh',
      compileflags: '-lm -lpthread',
      timestamp: '2025-02-19 08:14:00',
      targetmodel: 'DGCNN_9、DGCNN_20、GIN0_9、GIN0_20、GIN0WithJK_9、GIN0WithJK_20',
      iteration: '50',
      schedule: '100',
      controlflow: 'all'
    },
    {
      id: '5',
      directory: '/home/lebron/IRFuzz/Test/139',
      compilefile: 'compile.sh',
      compileflags: '-lm -lpthread',
      timestamp: '2025-01-02 14:52:00',
      targetmodel: 'DGCNN_9、DGCNN_20、GIN0_9、GIN0_20、GIN0WithJK_9、GIN0WithJK_20',
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
