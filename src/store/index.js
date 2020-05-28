import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let currentFloor = window.localStorage.getItem('floor');
let zoneSelect = window.localStorage.getItem('zoneSelect');
let slotSelect = window.localStorage.getItem('slotSelect');

export default new Vuex.Store({
  state: {
    floor: currentFloor,
    zoneSelect : zoneSelect,
    slotSelect:slotSelect
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
    changeSlot(state, slot) {
      state.slotSelect = slot
      //console.log('function changeFloor')
      this.commit('saveData');
    },
    saveData(state){
      window.localStorage.setItem("floor",JSON.stringify(state.floor));
      window.localStorage.setItem("zoneSelect",JSON.stringify(state.zoneSelect));
      window.localStorage.setItem("slotSelect",JSON.stringify(state.slotSelect));
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
