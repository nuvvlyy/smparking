import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let currentFloor = 1;
let test = 5

export default new Vuex.Store({
  state: {
    floor: currentFloor
  },
  mutations: {
    changeFloor(state, floor) {
      state.floor = floor
      //console.log('function changeFloor')
    }
  }, getters: {
    current: state => {
      let now = 1
      now = state.floor
      return now;
    }
  },
  actions: {},
  modules: {}
});
