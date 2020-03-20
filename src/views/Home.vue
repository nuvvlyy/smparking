<template>
  <div class="home container align-self-center">
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />-->
    <div class="row h-100 d-inline-flex p-2">
      <div class="col-sm-12 my-auto">
        <h1 class="title">Login</h1>
        <a
          class="btn btn-warning btn-login my-2 my-sm-2 ml-2"
          type="submit"
          data-toggle="modal"
          data-target="#login"
        >Login</a>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {}
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Raleway&display=swap");
.home {
  font-family: "Raleway", sans-serif;
}
.title {
  font-size: 10em;
}
.my-auto {
  margin-top: auto;
  margin-bottom: auto;
}
</style>
