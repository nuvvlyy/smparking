import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let currentFloor = window.localStorage.getItem('floor');
let zoneSelect = window.localStorage.getItem('zoneSelect');

export default new Vuex.Store({
  state: {
    floor: currentFloor,
    zoneSelect : zoneSelect
  },
  mutations: {
    changeFloor(state, floor) {
      state.floor = floor
      //console.log('function changeFloor')
      this.commit('saveData');
    },
    changeZone(state, zone) {
      state.zoneSelect = zone
      //console.log('function changeFloor')
      this.commit('saveData');
    },
    saveData(state){
      window.localStorage.setItem("floor",JSON.stringify(state.floor));
      window.localStorage.setItem("zoneSelect",JSON.stringify(state.zoneSelect));
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
