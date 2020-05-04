<template>
  <div class="config">
    <div class="page-wrapper d-flex align-items-stretch">
      <Sidebar />

      <div class="container-fluid">
        <!-- <initParking></initParking> -->

        <div class="page-content p-4 p-md-5 pt-5">
          <Navbar />

          <div class="bg-light">
            <!-- <h1 class="display-2">Config</h1> -->
            <page-number></page-number>
            <main class="page-content pt-2">
              <router-view></router-view>
              <div>
                <section>
                  <nav aria-label="Page navigation ">
                    <div class="pagination overflow-auto justify-content-center">
                      <div class>
                        <b-pagination-nav
                          pills
                          v-model="currentPage"
                          :link-gen="linkGen"
                          :number-of-pages="rows"
                          use-router
                        ></b-pagination-nav>
                      </div>
                      <div>
                        <b-form inline class="mx-2" >
                          <b-row>
                            <b-col sm="2">
                              <b-form-input
                                id="goFloor"
                                v-model="goFloor"
                                class="mb-2 mr-sm-2 mb-sm-0 text-center"
                                type="number"
                                min="1"
                                max="100"
                                :placeholder="[[currentPage]]"
                              ></b-form-input>
                            </b-col>
                          </b-row>
                          <b-button type="submit" pill variant="info" >Go</b-button>
                        </b-form>
                      </div>
                      <!-- <p class="mx-3">Current Page: {{ currentPage }}</p> -->
                    </div>
                  </nav>
                </section>
              </div>
            </main>

            <!-- <div class="row">
              <div class="col-sm-6">
                <div class="card">
                  <div class="card-header">Zone A</div>
                  <div class="card-body ">
                    <ul class="spot-list spot-list-vertical p-0 my-1 mx-0">
                      
                      <a href="spot"><li class="spot"></li></a>
                      <a href="spot"><li class="spot"></li></a>
                      <a href="spot"><li class="spot"></li></a>
                      <a href="spot"><li class="spot"></li></a>
                      <a href="spot"><li class="spot"></li></a>
                      
                     
                    </ul>
                    <ul class="spot-list spot-list-vertical p-0 my-1 mx-0">
                      <a href="spot"><li class="spot"></li></a>
                      <a href="spot"><li class="spot"></li></a>
                      <a href="spot"><li class="spot"></li></a>
                      <a href="spot"><li class="spot"></li></a>
                      <a href="spot"><li class="spot"></li></a>
                      
                    </ul>
                      
                  </div>
                </div>
              </div>
            </div>-->

            <!-- <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" first-number></b-pagination> -->
          </div>
        </div>
      </div>
    </div>

    <!-- <PageNavi /> -->

    <initParking></initParking>
    <editFloor></editFloor>
    <slotModal></slotModal>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PageNavi from "@/components/PageNavi";
import InitParking from "@/components/InitParking";
import EditFloor from "@/components/EditFloor";
import SlotModal from "@/components/SlotModal";

import PageNumber from "@/components/PageNumberBackground.vue";
export default {
  components: {
    Navbar,
    Sidebar,
    PageNavi,
    InitParking,
    EditFloor,
    SlotModal,
    PageNumber
  },
  data() {
    return {
      rows: 100,
      perPage: 1,
      currentPage: this.$store.state.floor,
      goFloor:null
    };
  },
  // data() {
  //   return {
  //     zone: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  //     perZone: [1, 2, 3, 4, 5, 6, 7, 8],
  //     slot: 4
  //   };
  // },
  // data() {
  //   return {
  //     rows: 100,
  //     perPage: 1,
  //     currentPage: 4
  //   };
  // }
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? "?" : `?floor=${pageNum}`;
      //return pageNum === 1 ? "?" : `config/floor/${pageNum}`;
    },
    changefloor() {}
  },
  updated() {
    this.$store.commit("changeFloor", this.currentPage);
    //alert('update Config',this.rows)
    console.log(this.currentPage)
    
  },
  onSubmit(e) {}
};
</script>
<style lang="scss">
.config {
  z-index: -1;
  min-height: 100%;
  min-width: 100%;
}
</style>
