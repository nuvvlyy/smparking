<template>
  <div class="page-number">
    <p class="text-background text-floor">Floor</p>
    <p class="text-background text-number mt-3">{{this.$store.getters.current}}</p>
  </div>
</template>
<script>
export default {
  name: "pageNumber",
  data() {
    return {
      //floor: this.$store.getters.current,
      //testState: this.$store.state.test
    };
  },

};
</script>
<style lang="scss">
.text-background {
  color: rgb(199, 199, 199);
  position: fixed;
  font-weight: 400;
  opacity: 50%;
}
.text-floor {
  font-size: 8rem;
  top: 6vh;
  right: 4vw;
}
.text-number {
  font-size: 20rem;
  top: 6vh;
  right: 4vw;
}
</style>