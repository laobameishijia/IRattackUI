// store/index.js
import { createStore } from 'vuex';
import task from './modules/TaskStore';

export default createStore({
  modules: {
    task,
  }
});
