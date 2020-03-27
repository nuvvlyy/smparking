<template>
  <div class="config">
    <div class="page-wrapper d-flex align-items-stretch">
      <Sidebar />

      <div class="container-fluid">
        <!-- <initParking></initParking> -->

        <div class="page-content p-4 p-md-5 pt-5">
          <Navbar />
          <page-number></page-number>
          <div class="bg-light">
            <h1 class="display-2">Config</h1>

            <main class="page-content pt-2">
              <router-view></router-view>
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

            <div class="container-fluid">
              <div class="row">
                <div class="col-md-2" v-for="(i,index) in zone" :key="index">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th colspan="2">Zone{{index+1}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(i,index) in perZone" :key="index">
                        <td>spot</td>
                        <td>spot</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" first-number></b-pagination> -->
          </div>
        </div>
      </div>
    </div>
    <PageNavi />

    <initParking></initParking>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PageNavi from "@/components/PageNavi";
import InitParking from "@/components/InitParking";

import PageNumber from "@/components/PageNumberBackground.vue";
export default {
  components: {
    Navbar,
    Sidebar,
    PageNavi,
    InitParking,
    PageNumber
  },
  data() {
    return {
      zone: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      perZone: [1, 2, 3, 4, 5, 6, 7, 8],
      slot: 4
    };
  },
  // data() {
  //   return {
  //     rows: 100,
  //     perPage: 1,
  //     currentPage: 4
  //   };
  // }
  methods: {}
};
</script>
<style lang="scss">
.spot-list {
  list-style-type: none;
  margin: 0;
  float: left;
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.spot-list li {
  float: right;
  width: 0.5em;
  height: 1em;
  margin: 0.1em;
  background-color: rgb(163, 163, 163);
}
// .spot-list-vertical {
//   transform: rotate(-90deg);
// }
</style>
