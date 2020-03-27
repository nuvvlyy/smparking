<template>
  <div class="page-number">
    <p class="text-background text-floor">Floor</p>
    <p class="text-background text-number">1</p>
  </div>
</template>
<script>
export default {
  name: "pageNumber"
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
  left: 30rem;
  top: 20%;
}
.text-number {
  font-size: 20rem;
  left: 50rem;
  top: 5%;
}
</style>