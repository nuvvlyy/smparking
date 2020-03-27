<template>
  <div>
    <nav id="sidebar">
      <div class="custom-menu">
        <button type="button" id="sidebarCollapse" class="btn btn-primary" @click="closeMenu()">
          <i class="fa fa-bars"></i>
          <span class="sr-only">Toggle Menu</span>
        </button>
      </div>
      <div class="p-4 pt-5">
        <h1>
          <a href="/" class="logo">SM</a>
          <span class="h6 ml-1">parking</span>
        </h1>
        <ul class="list-unstyled components mb-5">
          <li class="active">
            <h5 class="h6">Adjust per Zone</h5>

            <form class="form-row my-4 justify-content-center">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Zone" />
              </div>
              <div class="form-group col-md-5">
                <input type="text" class="form-control" placeholder="Width" />
              </div>
              <span class="h6 align-self-center mx-1 pb-2">
                <i class="fa fa-times" aria-hidden="true"></i>
              </span>
              <div class="form-group col-md-5">
                <input type="text" class="form-control" placeholder="Height" />
              </div>

              <fieldset class="form-group">
                <div class="row">
                  <legend class="col-form-label col-sm-2 pt-0 mx-2">Side</legend>
                  <div class="col-sm-9">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="gridRadios"
                        id="gridRadios1"
                        value="option1"
                        checked
                      />
                      <label class="form-check-label" for="gridRadios1">One Side</label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="gridRadios"
                        id="gridRadios2"
                        value="option2"
                      />
                      <label class="form-check-label" for="gridRadios2">Two Side</label>
                    </div>
                  </div>
                </div>
              </fieldset>

              <button type="submit" class="btn btn-warning d-blockmr-0 ml-auto">Apply Change</button>
            </form>
          </li>

          <li>
            <a href="#">Portfolio</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>

        <div class="mb-5">
          <h3 class="h6">Subscribe for newsletter</h3>
          <form action="#" class="colorlib-subscribe-form">
            <div class="form-group d-flex">
              <div class="icon">
                <span class="icon-paper-plane"></span>
              </div>
              <input type="text" class="form-control" placeholder="Enter Email Address" />
            </div>
          </form>
        </div>

        <div class="footer">
          <p>SM PARKING</p>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "Sidebar",
  methods: {
    closeMenu() {
      if ($) {
        ("use strict");

        var fullHeight = function() {
          $(".js-fullheight").css("height", $(window).height());
          $(window).resize(function() {
            $(".js-fullheight").css("height", $(window).height());
          });
        };
        fullHeight();

        $("#sidebarCollapse").on("click", function() {
          $("#sidebar").toggleClass("active");
        });
      }
    }
  }
};
</script>
<style lang="scss">
@import "./src/assets/sidebar.scss";
#sidebar {
  min-height: 100vh;
}
</style>