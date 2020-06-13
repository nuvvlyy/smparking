<template>
  <div class="containner">
    <div class="center">
      <h2 class="my-5">Assigned Slot</h2>
      <p class="display-1" style="color:black">{{recommendSlot.id}}</p>
      <button class="btn btn-warning" >Get Ticket</button>
    </div>
  </div>
</template>
<script>
//import { rdb } from "../firebase";
export default {
  data() {
    return {
      rec: null
    };
  },
  mounted() {
    this.rec = JSON.parse(this.$store.getters.firstSlotOut);
  },
  computed: {
    recommendSlot() {
      let t = JSON.parse(this.$store.getters.firstSlotOut);

      if (this.$store.getters.firstSlotOut == '"') {
        return "Parking Full";
      } else return t[0];
    }
  },
  methods: {
    // getTicket() {
    //   alert(this.recommendSlot);
    // }
    /**
     *  
     *  let slotSelect = [this.$store.state.slotSelect[0]].toString();
      if (slotSelect !== null) {
        if (this.bestSlot === "accepted") {
          let setBsetToFirebase = rdb
            .ref("/bestSlot")
            .child(slotSelect)
            .set("true")
            .then(() => console.log("set best Success"));
        }
      }
     * 
     */
  }
};
</script>
<style lang="scss">
.center {
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
}
html,
body {
  margin: 0;
  padding: 0;
  background-color: #aebfbe;
}
</style>

